const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    identificador: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', schema)