from flask import Flask
from flask import request

# from keras.models import load_model
# import tensorflow as tf
# import os

app = Flask(__name__)


# Load model from file
# todo: this not the model file, there are other dependencies
# model = tf.keras.models.load_model(os.path.join("model", "gold_model.h5"))


@app.route('/')
def home():
    return "hello world!"


# # Predicts winner of match
# @app.route('/predictWinner')
# def predict_winner():
#     data = request.get_json()
#     # todo create an array of json
#     # Create array of champions from request data
#     champions = create_champion_array(data)
#
#     # Predict winner
#     prediction = model.predict([champions])
#     return str(prediction[0][0])


# Creates champion array from json data
def create_champion_array(data):
    return [data["redTop"], data["redJungle"], data["redMid"], data["redAdc"], data["redSupport"], data["blueTop"],
            data["blueJungle"], data["blueMid"], data["blueAdc"], data["blueSupport"]]


# todo: change flask to production WSGI server
if __name__ == "__main__":
    app.run(debug=True)
