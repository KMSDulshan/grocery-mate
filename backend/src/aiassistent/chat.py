import random
import json
import torch
import pickle
from model import NeuralNet
from my_nltk import bag_of_words, tokenize
from recipes_model import df
import requests
import re
import random

print(df.columns.tolist())

device = 'cuda' if torch.cuda.is_available() else 'cpu'

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]
last_recipes = []  # Global list to keep track of suggested recipes


model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()
print("Model loaded successfully:", model)

bot_name = "Natsu"



def normal_chat_response(message):
    responses = [
        "I'm not sure how to respond to that.",
        "Could you rephrase your question?",
        "Hmm, I didn't quite get that.",
        "Try asking me about a recipe or nutrition info!",
        "Sorry, can you ask that in a different way?"
    ]
    return random.choice(responses)




# nutrition suggestion
def is_nutrition_query(message):
    keywords = ["nutrition", "calories", "fat", "protein", "carbs"]
    return any(word in message.lower() for word in keywords)


def extract_ingredients(text):
    # Basic placeholder: split words and return any food-related terms
    # You can later make this more advanced with NLP or keyword lists
    return [word for word in text.lower().split() if word.isalpha()]


def get_nutrition_info(ingredient):
    try:
        url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={ingredient}&search_simple=1&action=process&json=1"
        response = requests.get(url)
        data = response.json()

        if "products" in data and len(data["products"]) > 0:
            product_data = data["products"][0]
            nutriments = product_data.get("nutriments", {})

            energy = nutriments.get("energy-kcal_100g", "N/A")
            proteins = nutriments.get("proteins_100g", "N/A")
            fats = nutriments.get("fat_100g", "N/A")
            carbs = nutriments.get("carbohydrates_100g", "N/A")

            return (
                f"Nutritional information for **{ingredient.title()}** per 100g:\n"
                f"- Energy: {energy} kcal\n"
                f"- Proteins: {proteins} g\n"
                f"- Fats: {fats} g\n"
                f"- Carbohydrates: {carbs} g"
            )
        else:
            return f"Sorry, no nutrition info found for '{ingredient}'."

    except Exception as e:
        return f"Error fetching nutrition info: {str(e)}"



def handle_user_input(message):
    if is_nutrition_query(message):
        return get_nutrition_info(message)

    # Handle recipe suggestions
    elif any(word in message.lower() for word in ['suggest', 'recipe', 'cook', 'make']):
        return get_recipe_recommendation(message)

    # Handle general/grocery input (e.g., ingredients like "egg", "rice")
    elif message.strip():
        return get_recipe_recommendation(message)

    return "I do not understand..."


def get_chat_response(msg):
    """sentence = tokenize(msg)
    print(f"Tokenized Sentence: {sentence}")

    X = bag_of_words(sentence, all_words)
    print(f"Bag of Words Vector: {X}")"""

    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.70:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])

    try:
        return get_recipe_recommendation(msg)

    except Exception as e:
        print(f"Error in recommendation: {e}")
        return "I do not understand...."


# load the saved model
with open("recipe_model.pkl", "rb") as f:
    recipe_model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


# function to get recipe recommendation
def recommend_recipe(user_ingredients):
    print(f"User ingredients: {user_ingredients}")  # Debugging
    # convert user input to a vector
    user_vector = vectorizer.transform([' '.join(user_ingredients)])

    # find the closest recipe
    _, indices = recipe_model.kneighbors(user_vector)

    # print("Available columns in DataFrame:", df.columns)

    recommended_recipes = df.iloc[indices[0]]['Title'].tolist()

    print(f"recommended_recipes : {recommended_recipes}")  # debug code

    return recommended_recipes



def get_full_recipe(recipe_name):
    recipe_details = df[df['Title'].str.lower() == recipe_name.lower()]
    if not recipe_details.empty:
        ingredients = recipe_details.iloc[0]['Cleaned_Ingredients']
        instructions = recipe_details.iloc[0]['Instructions']

        return {
            "ingredients": ingredients,
            "instructions": instructions
        }
    else:
        return None

conversation_context = {
    "last_selected_recipe": None
}

# chatbot function using the model
def get_recipe_recommendation(user_input):
    user_input = user_input.lower()

    # Handle user confirmation for full recipe
    if user_input in ["yes", "yeah", "sure", "ok", "okay", "yup"]:
        last_recipe = conversation_context.get("last_selected_recipe")
        if last_recipe:
            # Fetch and return full recipe from dataframe
            row = df[df['Title'].str.lower() == last_recipe.lower()]
            if not row.empty:
                instructions = row.iloc[0]['Instructions']
                return f"Here is the full recipe for '{last_recipe.title()}':\n\n{instructions}"
            else:
                return "Sorry, I couldn't find the full recipe details."


    # debugging
    print(f"[DEBUG] Processed input: {user_input}")

    # if user asks for a recipe explicitly
    if "suggest a recipe" in user_input or "recipe" in user_input:
        # Extract ingredients from user input (if any)
        cleaned_input = user_input.replace("suggest a recipe with ", "").strip()
        ingredients = [item.strip() for item in cleaned_input.split(",") if item.strip()]

        # If no ingredients, ask for them
        if not ingredients:
            return "What ingredient do you want me to use in the recipe?"

        recommended = recommend_recipe(ingredients)
        if recommended:
            # Save the first suggestion
            conversation_context["last_selected_recipe"] = recommended[0]
            return f"Here are some recipe ideas: {recommended}"
        else:
            return "Sorry, I couldn't find any recipes with those ingredients."

    # if user input contains ingredients
    elif "," in user_input or any(kw in user_input for kw in ['egg', 'milk', 'butter']):
        # Clean up input and extract ingredients
        cleaned_input = re.sub(r"(suggest.*?with|suggest.*?using|i have|recipe with|recipe using)", "", user_input)
        cleaned_input = cleaned_input.strip()

        ingredients = [item.strip() for item in cleaned_input.split(",") if item.strip()]

        print(f"[DEBUG] Extracted ingredients: {ingredients}")

        recommended = recommend_recipe(ingredients)

        if recommended:
            # Save the first suggestion
            conversation_context["last_selected_recipe"] = recommended[0]
            return f"Here are some recipe ideas: {recommended}"
        else:
            return "Sorry, I couldn't find any recipes with those ingredients."

    # If user input matches a recipe name
    elif user_input in [title.lower() for title in df['Title']]:
        conversation_context["last_selected_recipe"] = user_input
        return f"Great choice! Would you like the full recipe for '{user_input.title()}'?"

    return "I didn't quite catch that. Could you be more specific?"

## to see all the tags are loaded or not
print([intent["tag"] for intent in intents["intents"]])



def chatbot():
    print("Let's chat! Type 'quit' to exit")
    while True:
        user_input = input("me: ")
        if user_input.lower() == 'quit':
            break



        elif "recipe" in user_input.lower():
            user_ingredients = extract_ingredients(user_input)
            print("User ingredients:", user_ingredients)
            recommended = get_recipe_recommendation(user_input)
            print("Here are some recipe ideas:", recommended)

        elif any(word in user_input.lower() for word in ["nutrition", "calories", "nutrients"]):
            # Try to extract the food name
            food_keywords = ["nutrition of", "calories of", "nutrients of", "nutrition in", "calories in",
                             "nutrients in"]
            item = user_input.lower()
            for key in food_keywords:
                if key in item:
                    item = item.replace(key, "").strip()
                    break

            if not item:
                print("Please tell me which food item you're asking about.")
                continue

            nutrition_info = get_nutrition_info(item)
            print(nutrition_info)

        else:
            print("I'm not sure how to respond to that. Try asking for a recipe or nutrition info.")




if __name__ == "__main__":

    print("Let's chat! Type 'quit' to exit")
    while True:
        user_input = input("me: ").strip()
        if user_input.lower() == "quit":
            break

        # Check for greetings
        if "hello" in user_input.lower() or "hi" in user_input.lower():
            print("Hi there! How can I help you with your shopping today?")

        # Check for payment
        elif "payment" in user_input.lower():
            print("We accept credit cards, debit cards, PayPal, and Apple Pay.")

        # Nutrition query
        elif is_nutrition_query(user_input):
            item = user_input.lower().replace("nutrition", "").replace("of", "").strip()
            print(f"Looking up nutrition for: {item}")
            nutrition_info = get_nutrition_info(item)
            if nutrition_info:
                print(nutrition_info)
            else:
                print("Something went wrong while fetching nutrition info.")

        # Recipe request
        elif "recipe" in user_input.lower():
            ingredients = [user_input]
            print("Getting recipe suggestions...")
            print("User ingredients:", ingredients)
            recommended = get_recipe_recommendation(user_input)
            print("recommended_recipes :", recommended)
            print("Here are some recipe ideas:", recommended)
            last_recipes = recommended  # Save the list for later matching

        # Check if user input matches a recipe from the last list
        elif user_input in last_recipes:
            print(f"Great choice! Would you like the full recipe for '{user_input}'?")
            confirmation = input("me: ").strip().lower()
            if confirmation in ["yes", "yeah", "sure", "ok"]:
                details = get_full_recipe(user_input)
                if details:
                    print(f"Here's the full recipe for **{user_input}**:\n")
                    print(f"**Ingredients:**\n{details['ingredients']}\n")
                    print(f"**Instructions:**\n{details['instructions']}")
                else:
                    print("Sorry, I couldn't find the full recipe details.")
            else:
                print("Okay, let me know if you want another recipe.")

        else:
            print("I'm not sure how to respond to that. Try asking for a recipe or nutrition info.")
