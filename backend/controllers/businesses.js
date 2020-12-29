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


module.exports = businesses;