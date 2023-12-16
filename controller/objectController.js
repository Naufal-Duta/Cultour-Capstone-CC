const Tourist_Attractions_list = require('../models/AttractionsModels')
const Users = require('../models/usersModels')

const getAllAttractions = async (req, res) => {
    try {
        const places = await Tourist_Attractions_list.find()
        res.status(200).send({
            success:true,
            places,
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getObjectById = async (req, res) => {
    try {
        const object = await Object.findOne({_id: req.params._id})
        if (object) {
            res.status(200).send({
                success:true,
                object,
            });
        }
        
        else {
            res.status(400).send({message: "Objek Tidak Ditemukan"})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addObject = async (req, res) => {
    try {
        const createObject = await Tourist_Attractions_list.create({
            _id: req.body._id,
            name: req.body.name,
            address_full: req.body.address_full,
            category: req.body.category,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            rating: req.body.rating
        })
        res.json(createObject);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const saveObject = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]
        const user = await Users.findOneAndUpdate({
            token: token
        },
        {
            $push: {
                objectSaved: req.params._id}
        },
        {
            new:true
        })
        res.status(200).send({user})
    } catch (error) {
        res.status(500).send({error})
    }
}

const unsaveObject = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]
        const user = await Users.findOneAndUpdate({
            token: token
        },
        {
            $pull: {
                objectSaved: req.params._id}
        },
        {
            new:true
        })
        res.status(200).send({user})
    } catch (error) {
        res.status(500).send({error})
    }
}


module.exports = {getAllAttractions, addObject, getObjectById, saveObject, unsaveObject}