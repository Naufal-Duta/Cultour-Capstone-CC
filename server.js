const express = require('express')
var cors = require('cors')
const usersRoute = require('./routes/usersRoute')
const objectRoute = require('./routes/objectRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const auth = require('./middleware/auth')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()) 
app.use('/users', usersRoute);
app.use('/object', objectRoute);

app.get('/', (req, res) => {
    res.send('GET diterima')
});

app.get("/test", auth, (req, res) => {
    res.status(200).send('POST diterima');
});

app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log(`🚀 Connected to mongoDB and Listening on port ${PORT} 🚀`)
        })
    })

    .catch((error) => {
        console.log(error)
    })