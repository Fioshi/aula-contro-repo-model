const mongoose = require('mongoose');
const registro = require('../models/registro');
const Registro = mongoose.model('Registro');

exports.get = async() => {
    const result = await Registro.find({});
    return result;
}

exports.create = async(data) => {
    const registro = Registro(data);
    await registro.save();
}