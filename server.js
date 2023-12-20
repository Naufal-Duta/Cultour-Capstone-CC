const express = require('express')
var cors = require('cors')
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
app.use('/home', homeRoute)
app.use('/users', usersRoute)
app.use('/places', placesRoute)

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(8080, () => {
            console.log(`🚀 Connected to mongoDB and Listening on port ${PORT} 🚀`)
        })
    })

    .catch((error) => {
        console.log(error)
    })