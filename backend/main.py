from flask import Flask
from flask import request
import tensorflow as tf
import os
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model from file
model = tf.keras.models.load_model(os.path.join("models", "Bronze.h5"))


# Predicts winner of match
@app.route('/predictWinner', methods=['POST'])
def predict_winner():

    data = request.get_json()
    
    # Create array of champions from request data
    championArray = create_champion_array(data)

    predictData = []
    predictData.append(championArray)
    predictData = np.array(predictData)
    predictData = predictData.astype('int32')
    predictData = [predictData[:, i] for i in range(predictData.shape[1])]

    # Make prediction
    prediction = model.predict(predictData)
    return str(prediction[0][0])

# Creates champion array from json data
def create_champion_array(data):
    print(data)
    return [float(data["redTop"]), float(data["redJungle"]), float(data["redMid"]), float(data["redAdc"]), float(data["redSupport"]), float(data["blueTop"]),
            float(data["blueJungle"]), float(data["blueMid"]), float(data["blueAdc"]), float(data["blueSupport"])]


if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
