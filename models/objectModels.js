const mongoose = require('mongoose')

const Object = mongoose.Schema (
    {
        objectName: {
            type: String,
            required: [true, "Please enter Object Name"]
        },

        address: {
            type: String,
            required: [true, "Please enter Address"]
        },
        
        rating: {
            type: Number,
            required: [true, "Please enter rating"]
        },

        category: {
            type: String,
            required: [true, "Please enter Category"]
        },

        description: {
            type: String,
        }
        
    }
)

const objectList = mongoose.model('Object', Object)

module.exports = objectList;