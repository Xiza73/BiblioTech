const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ClaseEjemploSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('ClaseEjemplo', ClaseEjemploSchema);