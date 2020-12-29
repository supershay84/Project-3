const express = require('express');
const businesses = express.Router();
const Business = require('../models/businesses.js');

//INDEX//
businesses.get('/', async (req,res) => {
    try {
        const foundBusinesses = await Business.find({});
        res.status(200).json(foundBusinesses);
    } catch(err) {
        res.status(400).json(error)
    }
});

//DELETE//
businesses.delete('/:id', async (req, res) => {
    try {
     const deletedBusiness = await Business.findByIdAndRemove(req.params.id);
     res.status(200).json(deletedBusiness);
    } catch (err) {
     res.status(400).json(err)   
    }
})

//UPDATE//
businesses.put('/:id', async (req, res) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBusiness);
    } catch (err) {
        res.status(400).json(err);
    }
});

//CREATE//
businesses.post('/', async (req,res) => {
    try{
        const createdBusiness = await Business.create(req.body);
        res.status(200).json(createdBusiness);
    } catch(err) {
        res.status(400).json(err);
    }
});

//SHOW//
businesses.get("/:id", async(req,res) => {
    try {
        const showBusiness = await Business.findById(req.params.id,)
        res.status(200).json(showBusiness);
    } catch(err) {
        res.status(400).json(err);
    }
})


module.exports = businesses;