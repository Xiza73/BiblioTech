const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema;

const Persona = new Schema({
    id_usuario: {
       type: ObjectId,
       ref: "Usuario",
       required: true,
       unique: true
    },
    nombre: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },
    apellido: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    }
});

module.exports = mongoose.model('Persona', Persona);