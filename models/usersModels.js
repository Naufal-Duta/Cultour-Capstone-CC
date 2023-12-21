const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Users = mongoose.Schema(
    {
        _id: {
            type: Number
        },
        username: {
            type: String,
            required: [true, "Please enter username"]
        },

        email: {
            type: String,
            required: [true, "Please enter email"]
        },

        password: {
            type: String,
            required: [true, "Please enter password"]
        },

        recommended_place: {
            type: Array
        },
        
        token: {
            type: String
        }
        
    }, {_id: false, versionKey: false }
)

Users.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const UserRegister = mongoose.model('Users', Users);

module.exports = UserRegister;