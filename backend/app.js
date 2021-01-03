require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const businessesController = require('./controllers/businesses.js');
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGODB_URI;


app.use(cors());
app.use(express.json());

// const whitelist = [
//     'http://localhost:3007',
//     'https://all-in-your-business.herokuapp.com/'
//   ];
//   const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Nah, son! Not allowed by CORS'));
//         }
//     },
//   };
  
 app.use(cors());

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindandModify: true});

mongoose.connection.on('error', (err) => console.log( err.message))

mongoose.connection.on('disconnected', () => console.log('Mongo Disconnected'));


mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose...');
});

app.use('/businesses', businessesController);

//LISTEN//
app.listen(PORT, () => {
    console.log('Celebrations happening on port', PORT);
});