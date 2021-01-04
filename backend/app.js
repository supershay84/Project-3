require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;
const businessesController = require('./controllers/businesses.js');
const MONGOURI = process.env.MONGODB_URI;
const User = require('./models/user');

const SECRET = 'inwestphiladelphiabornandraisedontheplaygroundiswhereispentmostofmydays'

app.use(cors());
app.use(express.json());


mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindandModify: true});

mongoose.connection.on('error', (err) => console.log( err.message))

mongoose.connection.on('disconnected', () => console.log('Mongo Disconnected'));


mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose...');
});

app.use('/businesses', businessesController);

//REGISTER//
app.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        if(err){
            res.status(400).json(err)
        } else {
            res.status(200).json(createdUser)
        }
    })
})

//LOGIN//
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username})
        if (bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({
                username: user.username}, SECRET)
            res.status(200).json({
                token,
                username,
                authenticated: true
            })
        }
    } catch(err) {
        res.status(400).json(err)
    }
})

//LISTEN//
app.listen(PORT, () => {
    console.log('Celebrations happening on port', PORT);
});