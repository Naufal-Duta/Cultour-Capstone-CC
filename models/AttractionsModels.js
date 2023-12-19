const mongoose = require('mongoose')

const Tourist_Attractions = mongoose.Schema (
    {
        place_id: {
            type: Number,
            required: [true, "Please enter place id"]
        },

        name: {
            type: String,
            required: [true, "Please enter Name"]
        },
        address_full: {
            type: String,
        },
        
        category: {
            type: String,
        },

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        rating: {
            type: Number 
        },

        image: {
            type: String 
        }

    }, {versionKey: false }
)

const Tourist_Attractions_list = mongoose.model('Tourist_Attractions', Tourist_Attractions)

module.exports = Tourist_Attractions_list;