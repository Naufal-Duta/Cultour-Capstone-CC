const express = require('express')
var cors = require('cors')
const axios = require('axios');
const usersRoute = require('./routes/usersRoute')
const logAndReg = require('./routes/logAndReg')
const placesRoute = require('./routes/placesRoute')
const homeRoute = require('./routes/homeRoute')
const auth = require('./middleware/auth')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()) 

app.use('/', logAndReg)
app.use('/home', auth, homeRoute)
app.use('/users', usersRoute)
app.use('/places', placesRoute)

app.post('/recommend', (req, res) => {
    const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend';
  
    // Dapatkan data yang dikirimkan melalui POST request di Express
    const postData = req.body;
  
    axios.post(apiUrl, postData)
      .then(response => {
        // Handle the response from the API
        res.send(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.post('/recommend/bus', (req, res) => {
const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/bus';

// Dapatkan data yang dikirimkan melalui POST request di Express
const postData = req.body;

axios.post(apiUrl, postData)
    .then(response => {
    // Handle the response from the API
    res.send(response.data);
    })
    .catch(error => {
    // Handle errors
    console.error('Error making POST request:', error);
    res.status(500).send('Internal Server Error');
    });
});

app.post('/recommend/hotel', (req, res) => {
const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/restaurant';

// Dapatkan data yang dikirimkan melalui POST request di Express
const postData = req.body;

axios.post(apiUrl, postData)
    .then(response => {
    // Handle the response from the API
    res.send(response.data);
    })
    .catch(error => {
    // Handle errors
    console.error('Error making POST request:', error);
    res.status(500).send('Internal Server Error');
    });
});

app.post('/recommend/restaurant', (req, res) => {
    const apiUrl = 'https://cultour-model-api-m24lpe6kpq-as.a.run.app/recommend/restaurant';
    
    // Dapatkan data yang dikirimkan melalui POST request di Express
    const postData = req.body;
    
    axios.post(apiUrl, postData)
        .then(response => {
        // Handle the response from the API
        res.send(response.data);
        })
        .catch(error => {
        // Handle errors
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
        });
    });

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(8080, () => {
            console.log(`🚀 Connected to mongoDB and Listening on port ${PORT} 🚀`)
        })
    })

    .catch((error) => {
        console.log(error)
    })