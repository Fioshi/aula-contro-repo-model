const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    ticket: {
        type: String,
        required: true,
    },
    historico: {
        type: String,
        required: true
    },
    idAtendente: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Registro', schema)