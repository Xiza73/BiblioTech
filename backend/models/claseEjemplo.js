const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ClaseEjemplo = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ClaseEjemplo', ClaseEjemplo);