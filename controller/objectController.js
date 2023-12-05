const Object = require('../models/objectModels')

const getAllObject = async (req, res) => {
    try {
        const listObject = await Object.find()
        res.status(200).send({
            sucess:true,
            listObject,
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
        const createObject = await Object.create({
            objectName: req.body.objectName,
            address: req.body.address,
            rating: req.body.rating,
            category: req.body.category,
            description: req.body.description
        })
        res.json(createObject);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getAllObject, addObject, getObjectById}