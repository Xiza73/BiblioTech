const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Comentario = new Schema({
    comentario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
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

module.exports = mongoose.model('Comentario', Comentario);