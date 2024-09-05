const mongoose = require('mongoose');
const ticket = require('../models/ticket');
const Ticket = mongoose.model('Ticket');

exports.get = async() => {
    const result = await Ticket.find({});
    return result;
}

exports.create = async(data) => {
    const ticket = Ticket(data);
    await ticket.save();
}