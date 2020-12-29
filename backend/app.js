require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const businessesController = require('./controllers/businesses.js');
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGODB_URI;


//MIDDLEWARE//
app.use(express.json());

app.use('/businesses', businessesController);

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindandModify: true});

mongoose.connection.on('error', (err) => console.log( err.message))

mongoose.connection.on('disconnected', () => console.log('Mongo Disconnected'));


mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose...');
});

//LISTEN//
app.listen(PORT, () => {
    console.log('Celebrations happening on port', PORT);
});