const Users = require('../models/usersModels')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config();

const registerUsers = async (req, res) => {
    try {
        if(req.body.password === req.body.repeat_password) {
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
            res.json(register);
        }
        
        else if (req.body.password !== req.body.repeat_password) {
            res.status(400).send({message: "Enter the same password"});
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const loginUsers = async (req, res) => {

    try {
        const user = await Users.findOne({
            username: req.body.username
        })   
        
        if (!user) {
            return res.status(404).send({ message: "Username / Password incorrect" });
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
    
            user.token = token;
            res.status(200).send({
                success:true,
                data : {user}
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

module.exports = { registerUsers, loginUsers }