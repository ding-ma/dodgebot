from flask import Flask
from flask import request
import tensorflow as tf
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model from file
model = tf.keras.models.load_model(os.path.join("models", "model.h5"))


# Predicts winner of match
@app.route('/predictWinner', methods=["POST"])
def predict_winner():
    data = request.get_json()
    
    # Create array of champions from request data
    champions = create_champion_array(data)
    
    # Make prediction
    prediction = model.predict([champions])
    return str(prediction[0][0])


# Creates champion array from json data
def create_champion_array(data):
    return [data["redTop"], data["redJungle"], data["redMid"], data["redAdc"], data["redSupport"], data["blueTop"],
            data["blueJungle"], data["blueMid"], data["blueAdc"], data["blueSupport"]]


if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
