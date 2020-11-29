from flask import Flask
from flask import request
from keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load model from file
model = load_model("model.h5")

# Predicts winner of match
@app.route('/predictWinner')
def predictWinner():
    data = request.get_json()

    # Create array of champions from request data
    champions = createChampionArray(data)

    # Predict winner
    prediction = model.predict([champions])
    return str(prediction[0][0])

# Creates champion array from json data
def createChampionArray(data):
    champions = []

    # Appends each position
    champions.append(data["redTop"])
    champions.append(data["redJungle"])
    champions.append(data["redMid"])
    champions.append(data["redAdc"])
    champions.append(data["redSupport"])
    champions.append(data["blueTop"])
    champions.append(data["blueJungle"])
    champions.append(data["blueMid"])
    champions.append(data["blueAdc"])
    champions.append(data["blueSupport"])

    return champions