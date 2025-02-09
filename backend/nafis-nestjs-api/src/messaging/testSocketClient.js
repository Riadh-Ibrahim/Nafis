Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");

// Simulate Doctor (Doctor socket)
var doctorSocket = (0, socket_io_client_1.io)('http://localhost:3000');
doctorSocket.on('connect', function () {
    console.log('Doctor connected');
    doctorSocket.emit('joinConversation', { conversationId: 1 });

    doctorSocket.on('newMessage', function (message) {
        console.log('Doctor received message:', message);
    });
});

// Simulate Patient (Patient socket)
var patientSocket = (0, socket_io_client_1.io)('http://localhost:3000');
patientSocket.on('connect', function () {
    console.log('Patient connected');
    patientSocket.emit('joinConversation', { conversationId: 5 });

    patientSocket.emit('sendMessage', {
        conversationId: 1,
        expediteurId: 1,
        expediteurType: 'PATIENT',
        contenu: 'Hello, doctor!dfffffffffffffffdddddddddddddd',
        dateEnvoi: new Date(),
        seen: false,
    });
});
