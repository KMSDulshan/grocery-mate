from flask import Flask, render_template, request, jsonify
from chat import get_chat_response, get_recipe_recommendation, is_nutrition_query, get_nutrition_info, normal_chat_response
import os
#from flask_cors import CORS ## to run completely separate not as template

app = Flask(__name__,
            static_folder='../../../frontend/static',
            template_folder='../../../frontend/templates'
            )
#CROS(app)

# don't need this if use CORS
# render base HTML
@app.get("/")
def index_get():
    return render_template("base.html")


# TO do the predictions

@app.post("/predict")
def predict():
    text = request.get_json().get("message")

    response = get_chat_response(text)

    message = {"answer": response}  # dict with answer

    return jsonify(message)


@app.route('/api/message', methods=['POST'])
def chat():
    user_input = request.json.get('message')

    if is_nutrition_query(user_input):
        response = get_nutrition_info(user_input)

    else:
        if is_nutrition_query(user_input):
            response = get_nutrition_info(user_input)
        else:
            response = normal_chat_response(user_input)

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)

