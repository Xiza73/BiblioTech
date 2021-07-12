const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Favorito = new Schema({
    estado: {
        type: String,
        required: true
    },   
    id_usario: {
        type: String,
        required: true
    },
    id_libro: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Favorito', Favorito);