import speech_recognition as sr
import pyttsx3
from chat import get_chat_response

# === Voice Setup ===
recognizer = sr.Recognizer()
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio)
            print(f"Recognized speech: {text}")

            print("You said:", text)
            return text
        except sr.WaitTimeoutError:
            print("Timeout, no speech detected.")
        except sr.UnknownValueError:
            print("Sorry, I didn’t catch that.")
        except sr.RequestError:
            print("API unavailable.")
    return None


def main():
    while True:
        query = listen()
        if query:
            normalized_input = query.lower().strip()
            response = get_chat_response(normalized_input)
            speak(response)



if __name__ == "__main__":
    main()


