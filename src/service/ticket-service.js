const ticket = require('../models/ticket');
const repository = require('../repositories/ticket-repository');

'use strict'

const express = require('express')
const router = new express.Router();

// router.get('/private', (req, res) => {
//     const token = req.headers['authorization'];

//     if (!token || token !== 'meuTokenSecreto') {
//         return res.status(401).send('Unauthorized: token inválido');	
//     }

//     res.send('Area privada permitida!').sendStatus(200);
// });

// const tokensDatabase = {
//     'tokenAdmin': { role: 'admin' },
//     'tokenUser': { role: 'user' },
//     'tokenGuest': { role: 'guest' },
// };

// router.get('/admin', (req, res) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).send('Unauthorized: token não fornecido');
//     }

//     const user = tokensDatabase[token];
//     if (!user) {
//         return res.status(401).send('Unauthorized: token inválido');
//     }

//     if (user.role !== 'admin') {
//         return res.status(403).send('Forbidden: você não tem permissão para acessar esta área');
//     }

//     res.send('Welcome to the admin area!');
// });


router.post('/submit', (req, res) => {
    const ticket = { identificador, titulo, telefone } = req.body;

    if (!identificador || !titulo || !telefone) {
        return res.status(400).send('Favor preencher todos os campos corretamente');
    }

    repository.create(ticket)
    
    res.status(201).send('Created ticket');
});


// Objeto para rastrear as requisições de cada IP
// const requestCounts = {};
// const RATE_LIMIT = 5; // Limite de requisições permitido
// const TIME_WINDOW = 60 * 1000; // Tempo da janela em milissegundos (1 minuto)

// Middleware para rate limiting
//Definição: Middleware é uma função em um aplicativo Express (ou outros frameworks) 
//que processa requisições antes que elas cheguem à rota final ou resposta.

// router.use((req, res, next) => {
//     const ip = req.ip;
//     //console.log(ip)
//     if (!requestCounts[ip]) {
//         requestCounts[ip] = { count: 1, firstRequest: Date.now() };
//     } else {
//         requestCounts[ip].count++;
//     }

//     const currentTime = Date.now();
//     const timePassed = currentTime - requestCounts[ip].firstRequest;

//     if (timePassed < TIME_WINDOW && requestCounts[ip].count > RATE_LIMIT) {
//         return res.status(429).send('Too Many Requests: Please try again later.');
//     }

//     if (timePassed >= TIME_WINDOW) {
//         requestCounts[ip].count = 1;
//         requestCounts[ip].firstRequest = Date.now();
//     }

//     next();
// });

router.get('/', async (req, res) => {
    const tickets = await repository.get();
    res.json(tickets);
})


let items = [
    { id: 0, name: 'item1' },
    { id: 1, name: 'item2' },
    { id: 2, name: 'item3' }
];

router.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);

    if (isNaN(itemId)) {
        return res.status(400).send('Bad Request: Invalid ID format');
    }
    const item = items.find(item => item.id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});


router.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const newName = req.body.name;

    if (isNaN(itemId)) {
        return res.status(400).send('Bad Request: Invalid ID format');
    }

    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        items[itemIndex].name = newName;
        return res.status(204).send();
    } else {
        return res.status(404).send('Item not found');
    }
});

router.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);

    if (isNaN(itemId)) {
        return res.status(400).send('Bad Request: Invalid ID format');
    }

    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        return res.status(204).send();
    } else {
        return res.status(404).send('Item not found');
    }
});

let nextId = 3;

router.post('/items', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Bad Request: Name is required');
    }

    const newItem = { id: nextId++, name };

    items.push(newItem);

    return res.status(201).json(newItem);
});

const processingQueue = [];

router.post('/envio-whatsapp', (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).send('Bad Request: Data is required');
    }

    const requestId = Date.now();
    processingQueue.push({ requestId, data });

    return res.status(202).json({ requestId, message: 'Request accepted for processing' });
});

router.get('/envio-whatsapp/:requestId', (req, res) => {
    const requestId = parseInt(req.params.requestId, 10);

    if (isNaN(requestId)) {
        return res.status(400).send('Bad Request: Invalid request ID format');
    }

    const request = processingQueue.find(req => req.requestId === requestId);

    if (request) {
        return res.status(200).json(request);
    } else {
        return res.status(404).send('Request not found');
    }
});

module.exports = router;