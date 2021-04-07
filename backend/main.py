from flask import Flask
from flask import request
import tensorflow as tf
import os
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)


# Predicts winner of match
@app.route('/predictWinner', methods=['POST'])
def predict_winner():

    data = request.get_json()
    
    # Create array of champions from request data
    champion_array = create_champion_array(data)
    
    elo = data.get("elo", "Gold")
    if elo in ["Challenger", "GrandMaster", "Master"]:
        elo = "Diamond"
    
    if elo == "Unranked":
        elo = "Silver"
    # Load model from file
    try:
        model = tf.keras.models.load_model(os.path.join("models", f"2021-03-25-{elo}.h5"))
        # default to gold if there are any issues
    except:
        model = tf.keras.models.load_model(os.path.join("models", "2021-03-25-Silver.h5"))

    predict_data = []
    predict_data.append(champion_array)
    predict_data = np.array(predict_data)
    predict_data = predict_data.astype('int32')
    predict_data = [predict_data[:, i] for i in range(predict_data.shape[1])]

    # Make prediction
    prediction = model.predict(predict_data)
    return str(prediction[0][0])


# Creates champion array from json data
def create_champion_array(data):
    return [float(data["redTop"]), float(data["redJungle"]), float(data["redMid"]), float(data["redAdc"]), float(data["redSupport"]), float(data["blueTop"]),
            float(data["blueJungle"]), float(data["blueMid"]), float(data["blueAdc"]), float(data["blueSupport"])]


if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))

