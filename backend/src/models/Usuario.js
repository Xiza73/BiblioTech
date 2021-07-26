const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema;

const Usuario = new Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },    
    rol: {
        type: ObjectId,
        ref: "Rol",
        required: true
    },
    avatar: {
        data: Buffer,
        contentType: String,
    }
},{timestamps: true});

module.exports = mongoose.model('Usuario', Usuario);