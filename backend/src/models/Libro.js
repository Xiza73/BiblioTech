const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Libro = new Schema({
    arc_libro: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    fch_pub: {
        type: Date,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String,
    }
});

module.exports = mongoose.model('Libro', Libro);