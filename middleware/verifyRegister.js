const Users = require('../models/usersModels')

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const usernameCheck = await Users.findOne({
        username: req.body.username
    })
    try {
        if(usernameCheck) {
            res.status(400).send({message: "Username already used"})
            return;
        }
    } catch (error) {
        res.status(500).send({message: "Server-side error"})
        return;
    }

    const emailCheck = await Users.findOne({
        email: req.body.email
    })
    try {
        if(emailCheck) {
            res.status(400).send({message: "email already used"})
            return;
        }
    } catch (error) {
        res.status(500).send({message: "Server-side error"})
        return;
    }

    next();
};


const verifyRegister = checkDuplicateUsernameOrEmail;

module.exports = {verifyRegister}