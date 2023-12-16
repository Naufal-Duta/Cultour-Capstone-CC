from flask import Flask, jsonify, request
import os
from tensorflow.keras.models import load_model
import pandas as pd


app = Flask(__name__)
app.config['MODEL_FILE'] = 'model.h5'
model = load_model(app.config['MODEL_FILE'], compile=False)
tourist_attraction = pd.read_excel('Tourist Attraction_List.xlsx')

def user_array (preferences):
    place_df = tourist_attraction[['place_id','name','category','rating','latitude','longitude']]
    print(df)
    data_array = preferences.get('data', [])
    df = pd.DataFrame(data_array)
    predictions = model.predict(df)
    print(predictions)

@app.route('/')
def index_view():
    return jsonify({
        "status": {
            "code": 200,
            "message": "API Berhasil"
        },
        "data": None
    }), 200

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == "POST":
        preferences = request.json
        place_df = tourist_attraction[['place_id','name','category','rating','latitude','longitude']]
        print(place_df)
        data_array = preferences.get('data', [])
        df = pd.DataFrame(data_array)
        print(df)
        predictions = model.predict(df)
        print(predictions)
        return jsonify({"message": "Data berhasil diproses", "result": df.to_dict(orient='records')})
    else:
        return jsonify({
        "status": {
            "code": 405,
            "message": "Method Not Allowed"
        },
        "data": None
    }), 405

if __name__  == "__main__":
    app.run()
