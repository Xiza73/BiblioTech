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
    es_comentario : {
        type: Number, // 1 comentario 0 respuesta
    },
    id_usuario: {
        type: ObjectId,
        ref: "Usuario",
        required: true
    },
    id_libro: {
        type: ObjectId,
        ref: "Libro",
        required: true
    },
    id_respuesta:[{
        type: ObjectId,
        ref: "Comentario",
        required: false       
    }]
},{timestamps: true});

module.exports = mongoose.model('Comentario', Comentario);