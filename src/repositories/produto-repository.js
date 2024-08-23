const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async() => {
    const result = await Produto.find({});
    return result;
}