const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');

require('./models/ticket');
require('./models/registro');

const produtorRouter = require('./routes/ticket-route');
app.use('/tickets', produtorRouter);

const registroRouter = require('./routes/registro-route');
app.use('/registros', registroRouter);

const tickets = require('./service/ticket-service')
const regis = require('./service/registro-service')
app.use('/ticket', tickets)
app.use('/registro', regis)

module.exports = app;