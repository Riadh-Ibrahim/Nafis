import { io } from 'socket.io-client';

// Simulate Doctor (Doctor socket)
const doctorSocket = io('http://localhost:3000'); 
doctorSocket.on('connect', () => {
  console.log('Doctor connected');

  doctorSocket.emit('joinConversation', { conversationId: 1 });

  doctorSocket.on('newMessage', (message) => {
    console.log('Doctor received message:', message);
  });
});

// Simulate Patient (Patient socket)
const patientSocket = io('http://localhost:3000');
patientSocket.on('connect', () => {
  console.log('Patient connected');

  patientSocket.emit('joinConversation', { conversationId: 1 });

  patientSocket.emit('sendMessage', {
    conversationId: 1,
    expediteurId: 1,
    expediteurType: 'patient',
    contenu: 'Hello, doctor!',
    dateEnvoi: new Date(),
    seen: false,
  });
});
