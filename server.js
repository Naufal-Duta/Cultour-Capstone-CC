const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const usersRoute = require('./routes/usersRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const auth = require('./middleware/auth')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(express.json())

app.use('/api', usersRoute);

app.get('/', (req, res) => {
    res.send('GET diterima')
});

app.get("/test", auth, (req, res) => {
    res.status(200).send('POST diterima');
});

app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to mongoDB')
        app.listen(3000, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })

    .catch((error) => {
        console.log(error)
    })