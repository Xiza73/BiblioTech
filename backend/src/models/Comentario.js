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
    id_usuario: {
        type: String,
       // type: ObjectId,
       // ref: "Usuario",
        required: true
    },
    id_libro: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Comentario', Comentario);