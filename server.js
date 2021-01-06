const express = require('express');
const app = require('./backend/app');
app.use(express.static('build'));