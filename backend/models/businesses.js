const {Schema, model} = require('mongoose');

const businessSchema = Schema({
    name: {type: String, required : true},
    description: {type: String, required : true},
    url: {type: String, required : true},
    image: {type: String, required : false}
});

module.exports = model('Business', businessSchema);