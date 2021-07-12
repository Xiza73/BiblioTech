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
    fec_nac: {
        type: Date,
        required: true
    },
    grado: {
        type: String,
        required: true
    }
    //guarda imagen
    /*,photo: {
        data: Buffer,
        contentType: String,
    }*/
});

module.exports = mongoose.model('Usuario', Usuario);