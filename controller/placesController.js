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

const getPlacesById = async (req, res) => {
    try {
        const places = await places.findOne({_id: req.params._id})
        if (places) {
            res.status(200).send({
                success:true,Places,
            });
        }
        
        else {
            res.status(400).send({message: "Objek Tidak Ditemukan"})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addPlaces = async (req, res) => {
    try {
        const createplaces = await Tourist_Attractions_list.create({
            place_id: req.body.place_id,
            name: req.body.name,
            address_full: req.body.address_full,
            category: req.body.category,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            rating: req.body.rating,
            image: req.body.image
        })
        res.json(createplaces);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const savePlaces = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]
        const user = await Users.findOneAndUpdate({
            token: token
        },
        {
            $push: {
                placesSaved: req.params._id}
        },
        {
            new:true
        })
        res.status(200).send({user})
    } catch (error) {
        res.status(500).send({error})
    }
}

const unsavePlaces = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]
        const user = await Users.findOneAndUpdate({
            token: token
        },
        {
            $pull: {
                placesSaved: req.params._id}
        },
        {
            new:true
        })
        res.status(200).send({user})
    } catch (error) {
        res.status(500).send({error})
    }
}


module.exports = {getAllAttractions, addPlaces, getPlacesById, savePlaces, unsavePlaces}