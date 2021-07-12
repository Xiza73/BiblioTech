const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema;

const Comentario = new Schema({
    comentario: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    fecha: {
        type: Date,
        required: true
    },
    id_usario: {
        type: ObjectId,
        ref: "Usuario",
        required: true
    },
    id_libro: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comentario', Comentario);