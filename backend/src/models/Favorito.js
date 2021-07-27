const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema;

const Favorito = new Schema({  
    id_usuario: {
        type: ObjectId,
        ref: "Usuario",
        required: true
    },
    id_libro: {
        type: ObjectId,
        ref: "Libro",
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Favorito', Favorito);