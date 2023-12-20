const axios = require('axios');

const recommendPlace = async (req, res) => {
    try {
        const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend';

        // Get data sent via the POST request in Express
        const postData = req.body;

        // Make a POST request using axios and await the response
        const response = await axios.post(apiUrl, postData);

        // Handle the response from the API
        res.status(200).send(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
    }
}

const busNearRecommendedPlace = async (req, res) => {
    try {
        const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/bus';

        // Get data sent via the POST request in Express
        const postData = req.body;

        // Make a POST request using axios and await the response
        const response = await axios.post(apiUrl, postData);

        // Handle the response from the API
        res.status(200).send(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
    }
}

const restaurantNearRecommendedPlace = async (req, res) => {
    try {
        const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/restaurant';

        // Get data sent via the POST request in Express
        const postData = req.body;

        // Make a POST request using axios and await the response
        const response = await axios.post(apiUrl, postData);

        // Handle the response from the API
        res.status(200).send(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
    }
}

const hotelNearRecommendedPlace = async (req, res) => {
    try {
        const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/hotel';

        // Get data sent via the POST request in Express
        const postData = req.body;

        // Make a POST request using axios and await the response
        const response = await axios.post(apiUrl, postData);

        // Handle the response from the API
        res.status(200).send(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {recommendPlace, busNearRecommendedPlace, hotelNearRecommendedPlace, restaurantNearRecommendedPlace}