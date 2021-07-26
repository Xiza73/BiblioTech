const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Rol = new Schema({
    nombre: {
        type: String,
        trim: true,
        require: true,
        maxlength: 16,
        unique: true
    }
});

module.exports = mongoose.model('Rol', Rol);