const Users = require('../models/usersModels')
const Object = require('../models/objectModels')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

require("dotenv").config();

const registerUsers = async (req, res) => {
    try {
        const register = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const token = jwt.sign(
            {
                email: req.body.email,
                password: req.body.password
            },
            process.env.TOKEN_KEY,
        {
            expiresIn :"2h",
        })

        register.token = token;
        res.status(200).json({
            error: false,
            message: "user created"
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const getRegisterUsers = async (req, res) => {
    res.status(400).json({
        error: true,
        message: "not found"
    });
}

const loginUsers = async (req, res) => {

    try {
        const user = await Users.findOne({
            email: req.body.email
        })   
        
        if (!user) {
            return res.status(404).send({ message: "Email / Password incorrect" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if(match == true) {
            const token = jwt.sign(
                {
                    email: req.body.email,
                    password: req.body.password
                },
                process.env.TOKEN_KEY,
            {
                expiresIn :"2h",
            })
            
            await Users.findOneAndUpdate({
                username: req.body.username
            },
            {
                token: token
            })

            res.status(200).json({
                error: false,
                message: "Success",
                loginResult: {
                    userId: user._id,
                    name: user.username,
                    token: token
                }
            });
        }

        else if (match == false) {
            res.status(404).send({message: "Username / Password incorrect"});   
        }

    } 

    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const getAllUser = async (req, res) => {
    try {
        const listUser = await Users.find()
        if (listUser) {
            res.status(200).send({
                success:true,
                listUser
            })
        }
        else {
            res.status(400).send({message: "Tidak ada user"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({
            _id : req.params._id
        })
        if (user) {
            res.status(200).send({user})
        }
        else {
            res.status(400).send({message: "User tidak ditemukan"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSavedObjects = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const userToken = authHeader && authHeader.split(' ')[1]
        const user = await Users.findOne({
            token: userToken
        })
        
        const getUserSavedObject = user.objectSaved
        const objectSaved = []
        await Promise.all (
            getUserSavedObject.map(async (object) => {
            const getObject = await Object.findOne({ 
                _id: object
            })
            objectSaved.push(getObject)
        })
        )
        res.status(200).send({
            success: true,
            objectSaved
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { registerUsers, loginUsers, getUserById, getSavedObjects, getAllUser, getRegisterUsers }