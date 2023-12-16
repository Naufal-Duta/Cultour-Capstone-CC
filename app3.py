from flask import Flask, jsonify, request
import os
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd


tourist_attraction = pd.read_excel('Tourist Attraction_List.xlsx')

app = Flask(__name__)
app.config['MODEL_FILE'] = 'model.h5'
model = load_model(app.config['MODEL_FILE'], compile=False)

def dict_encoder(col, data):

  unique_val = data[col].unique().tolist()

  val_to_val_encoded = {x: i for i, x in enumerate(unique_val)}

  val_encoded_to_val = {i: x for i, x in enumerate(unique_val)}
  return val_to_val_encoded, val_encoded_to_val

@app.route('/recommend', methods=['POST'])
def recommend():

    place_df = tourist_attraction[['place_id','name','category','rating','latitude','longitude']]

    # Ambil data input dari permintaan POST
    preferences = request.json
    data_array = preferences.get('data', [])
    df = pd.DataFrame(data_array)
    print(df)
    user_id = df.user_id.iloc[0]
    place_visited_by_user = df[df.user_id == user_id]

    user_to_user_encoded, user_encoded_to_user = dict_encoder('user_id',df)
    df['user'] = df['user_id'].map(user_to_user_encoded)

    place_to_place_encoded, place_encoded_to_place = dict_encoder('place_id', df)
    df['place'] = df['place_id'].map(place_to_place_encoded)

    num_users, num_place = len(user_to_user_encoded), len(place_to_place_encoded)

    df['rating'] = df['rating'].values.astype(np.float32)

    min_rating, max_rating = min(df['rating']), max(df['rating'])

    # Membuat data lokasi yang belum dikunjungi user
    place_not_visited = place_df[~place_df['place_id'].isin(place_visited_by_user.place_id.values)]['place_id']

    place_not_visited = list(
        set(place_not_visited)
        .intersection(set(place_to_place_encoded.keys()))
    )
    print("place_not_visited 1\n",place_not_visited)
    place_not_visited = [[place_to_place_encoded.get(x)] for x in place_not_visited]

    user_encoder = df
    print(user_encoder)
    user_place_array = np.hstack(
        ([[user_encoder]] * len(place_not_visited), place_not_visited)
    )
    user_place_array = [user_place_array[:, 0], user_place_array[:, 1]]

    # Mengambil top 7 recommendation
    ratings = model.predict(user_place_array).flatten()
    top_ratings_indices = ratings.argsort()[-5:][::-1]

    recommended_place_ids = [
        place_encoded_to_place.get(place_not_visited[x][0]) for x in top_ratings_indices
    ]
    
    return jsonify({"message": "Data berhasil diproses", "Place Ids": recommended_place_ids})
    
# Lakukan prediksi menggunakan model
    # (Anda perlu menyesuaikan cara mendapatkan input dan melakukan prediksi sesuai dengan model Anda)
    
    # Kembalikan rekomendasi sebagai respons


if __name__ == '__main__':
    app.run(port=5000)