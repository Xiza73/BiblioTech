const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Usuario = new Schema({
    usuario: {
        type: String,
        required: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },    
    rol: {
        type: String,
        required: true
    },
    //guarda imagen
    imagen: {
        type: String
    }
    //falta un id para unir usuario y persona
    //guarda imagen
    /*,photo: {
        data: Buffer,
        contentType: String,
    }*/
});

module.exports = mongoose.model('Usuario', Usuario);