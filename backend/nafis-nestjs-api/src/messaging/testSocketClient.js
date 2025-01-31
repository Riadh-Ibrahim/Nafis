"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
// Simulate Doctor (Doctor socket)
var doctorSocket = (0, socket_io_client_1.io)('http://localhost:3000'); // Adjust URL if necessary
doctorSocket.on('connect', function () {
    console.log('Doctor connected');
    // Join the conversation room
    doctorSocket.emit('joinConversation', { conversationId: 1 });
    // Listen for new messages
    doctorSocket.on('newMessage', function (message) {
        console.log('Doctor received message:', message);
    });
});
// Simulate Patient (Patient socket)
var patientSocket = (0, socket_io_client_1.io)('http://localhost:3000'); // Adjust URL if necessary
patientSocket.on('connect', function () {
    console.log('Patient connected');
    // Join the conversation room
    patientSocket.emit('joinConversation', { conversationId: 5 });
    // Send a message
    patientSocket.emit('sendMessage', {
        conversationId: 1,
        expediteurId: 1,
        expediteurType: 'PATIENT',
        contenu: 'Hello, doctor!dfffffffffffffffdddddddddddddd',
        dateEnvoi: new Date(),
        seen: false,
    });
});
