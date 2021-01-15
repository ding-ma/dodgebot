from flask import Flask, request, jsonify
from keras.models import load_model
import tensorflow as tf
import os
from time import sleep
import random

"""
input example:
{
    "blue":{
        "picks":{
            "top":"aatrox",
            "mid":"mundo",
            "jg":"yi",
            "adc":"kaisa",
            "supp":"thresh"
        },
        "bans":[
            "ahri", "akali", "bob", "-1", "aaa"
        ]
    },
    "red":{
        "picks":{
            "top":"aatrox",
            "mid":"mundo",
            "jg":"yi",
            "adc":"kaisa",
            "supp":"thresh"
        },
        "bans":[
            "ahri", "akali", "bob", "-1", "aaa"
        ]
    }
}

output example:
{
"blue: 0.55,
"red": 0.45
}
"""
app = Flask(__name__)


# Load model from file

def mock_predict():
    n = random.random()
    return {"red": n, "blue": 1 - n}


# Predicts winner of match
@app.route('/predictwinner')
def predict_winner():
    data = request.get_json()
    print(data)
    
    # Create array of champions from request data
    champions = create_champion_array(data)
    sleep(random.randrange(1, 10))
    # Make prediction
    prediction = mock_predict()
    
    return mock_predict()


# Creates champion array from json data
def create_champion_array(data):
    # TODO
    return []


# TODO: change flask to production WSGI server
if __name__ == "__main__":
    app.run(debug=True)
