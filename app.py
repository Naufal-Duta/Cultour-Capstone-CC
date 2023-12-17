from flask import Flask, jsonify, request
import os
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd
from geopy.distance import geodesic

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.expand_frame_repr', False)

tourist_attraction = pd.read_excel('dataset/Tourist Attraction_List.xlsx')
bus_route = pd.read_excel('dataset/bus_route_merged.xlsx')
df_restaurant = pd.read_excel('dataset/Restaurant_List_Preprocessed.xlsx')
df_hotels = pd.read_excel('dataset/Hotel_List_Preprocessed.xlsx')
recommended_place = None

app = Flask(__name__)
app.config['MODEL_FILE'] = 'model.h5'
model = load_model(app.config['MODEL_FILE'], compile=False)

def dict_encoder(col, data):

  unique_val = data[col].unique().tolist()

  val_to_val_encoded = {x: i for i, x in enumerate(unique_val)}

  val_encoded_to_val = {i: x for i, x in enumerate(unique_val)}
  return val_to_val_encoded, val_encoded_to_val
 
def find_nearest_bus_route(place, bus_route):
    min_distance = float('inf')
    nearest_bus_route = None

    for _, bus_route in bus_route.iterrows():
        distance = geodesic((place['latitude'], place['longitude']),
                            (bus_route['latitude'], bus_route['longitude'])).kilometers

        if distance < min_distance:
            min_distance = distance
            nearest_bus_route = bus_route

    return nearest_bus_route, min_distance

def find_nearest_restaurants(place):
    place_location = (place['latitude'], place['longitude'])
    
    df_restaurant['distance'] = df_restaurant.apply(lambda row: geodesic(place_location, (row['latitude'], row['longitude'])).km, axis=1)
    
    nearest_restaurants = df_restaurant.nsmallest(3, 'distance')
    
    return nearest_restaurants[['name', 'latitude', 'longitude']]

def find_nearest_hotels(place):
    place_location = (place['latitude'], place['longitude'])
    
    df_hotels['distance'] = df_hotels.apply(lambda row: geodesic(place_location, (row['latitude'], row['longitude'])).km, axis=1)
    
    nearest_hotels = df_hotels.nsmallest(3, 'distance')
    
    return nearest_hotels[['name', 'latitude', 'longitude']]

def predict_recommend(request):
    userrating = pd.DataFrame(request)
    df = userrating.copy()
    df2 = tourist_attraction.copy()
    user_to_user_encoded, user_encoded_to_user = dict_encoder('user_id', df)
    place_to_place_encoded, place_encoded_to_place = dict_encoder('place_id', df2)

    place_df = tourist_attraction[['place_id','name','category','rating','latitude','longitude']]
    user_id = df.user_id.iloc[0]
    place_visited_by_user = df[df.user_id == user_id]

    place_not_visited = place_df[~place_df['place_id'].isin(place_visited_by_user.place_id.values)]['place_id']
    place_not_visited = list(
        set(place_not_visited)
        .intersection(set(place_to_place_encoded.keys()))
    )

    place_not_visited = [[place_to_place_encoded.get(x)] for x in place_not_visited]
    user_encoder = user_to_user_encoded.get(user_id)
    user_place_array = np.hstack(
        ([[user_encoder]] * len(place_not_visited), place_not_visited)
    )

    user_place_array = [user_place_array[:, 0], user_place_array[:, 1]]
    ratings = model.predict(user_place_array).flatten()
    top_ratings_indices = ratings.argsort()[-5:][::-1]
    recommended_place_ids = [
        place_encoded_to_place.get(place_not_visited[x][0]) for x in top_ratings_indices
    ]

    recommended_place = place_df[place_df['place_id'].isin(recommended_place_ids)]
    recommended_place_list = recommended_place.to_dict(orient='records')
    return recommended_place_list, recommended_place

@app.route('/recommend', methods=['POST'])
def recommend():

    global recommended_place
    preferences = request.json
    data_array = preferences.get('data', [])
    recommended_place_list, recommended_place = predict_recommend(data_array)

    #Output JSON
    return jsonify({
        "message": "Data berhasil diproses", 
        "Recommended Place": recommended_place_list
        })

@app.route('/recommend/bus', methods=['POST'])
def nearest_bus():
    global recommended_place
    if recommended_place is None:
        return jsonify({
                "error": True,
                "message": "Please Recommend First"
            }), 400
        
    else:
        result_rows = []
        for _, place in recommended_place.iterrows():
            nearest_bus_stop, distance = find_nearest_bus_route(place, bus_route)
            result_rows.append({
                'bus_id': nearest_bus_stop['bus_id'],
                'bus_stop_latitude': nearest_bus_stop['latitude'],
                'bus_stop_longitude': nearest_bus_stop['longitude'],
                'distance_to_nearest_bus_stop': distance,
                'place_name': place['name'],
                'place_latitude': place['latitude'],
                'place_longitude': place['longitude'],
                'nearest_bus_stop': nearest_bus_stop['nama']
            })
            
        result_df = pd.DataFrame(result_rows)
        nearest_bus_stop_list = result_df
        nearest_bus_stop_list = nearest_bus_stop_list.to_dict(orient='records')

        return jsonify({
            "message": "Data berhasil diproses", 
            "Nearest Bus stop from recommended place": nearest_bus_stop_list
        })

@app.route('/recommend/hotel', methods=['POST'])
def nearest_hotel():
    global recommended_place
    if recommended_place is None:
        return jsonify({
                "error": True,
                "message": "Please Recommend First"
            }), 400
    
    else:
        result_df = pd.concat([
        recommended_place,
        recommended_place.apply(lambda place: find_nearest_hotels(place).values.flatten(), axis=1).apply(pd.Series)
        ], axis=1)
        
        result_df.drop(['place_id','category','rating'], axis=1, inplace=True)
        result_df.columns = [
            'nama_recommended_place', 'latitude_recommended_place', 'longitude_recommended_place',
            'nama_hotel_1', 'latitude_hotel_1', 'longitude_hotel_1',
            'nama_hotel_2', 'latitude_hotel_2', 'longitude_hotel_2',
            'nama_hotel_3', 'latitude_hotel_3', 'longitude_hotel_3',
        ]

        nearest_hotel_list = result_df
        nearest_hotel_list = nearest_hotel_list.to_dict(orient='records')

        return jsonify({
            "message": "Data berhasil diproses", 
            "Nearest Hotel from recommended place": nearest_hotel_list
            })


@app.route('/recommend/restaurant', methods=['POST'])
def nearest_restaurant():
    global recommended_place
    if recommended_place != None:
        return jsonify({
                "error": True,
                "message": "Please Recommend First"
            }), 400
    
    else:
        result_df = pd.concat([
        recommended_place,
        recommended_place.apply(lambda place: find_nearest_restaurants(place).values.flatten(), axis=1).apply(pd.Series)
        ], axis=1)

        result_df.drop(['place_id','category','rating'], axis=1, inplace=True)
        result_df.columns = [
            'nama_recommended_place', 'latitude_recommended_place', 'longitude_recommended_place',
            'nama_restaurant_1', 'latitude_restaurant_1', 'longitude_restaurant_1',
            'nama_restaurant_2', 'latitude_restaurant_2', 'longitude_restaurant_2',
            'nama_restaurant_3', 'latitude_restaurant_3', 'longitude_restaurant_3',
        ]

        nearest_restaurant_list = result_df
        nearest_restaurant_list = nearest_restaurant_list.to_dict(orient='records')

        return jsonify({
            "message": "Data berhasil diproses", 
            "Nearest Restaurant from recommended place": nearest_restaurant_list
            })
    
if __name__ == '__main__':
    app.run(port=8000)