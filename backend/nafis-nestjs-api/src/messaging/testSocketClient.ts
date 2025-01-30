import { io } from 'socket.io-client';

// Simulate Doctor (Doctor socket)
const doctorSocket = io('http://localhost:3000');  // Adjust URL if necessary
doctorSocket.on('connect', () => {
  console.log('Doctor connected');

  // Join the conversation room
  doctorSocket.emit('joinConversation', { conversationId: 1 });

  // Listen for new messages
  doctorSocket.on('newMessage', (message) => {
    console.log('Doctor received message:', message);
  });
});

// Simulate Patient (Patient socket)
const patientSocket = io('http://localhost:3000');  // Adjust URL if necessary
patientSocket.on('connect', () => {
  console.log('Patient connected');

  // Join the conversation room
  patientSocket.emit('joinConversation', { conversationId: 1 });

  // Send a message
  patientSocket.emit('sendMessage', {
    conversationId: 1,
    expediteurId: 1,
    expediteurType: 'patient',
    contenu: 'Hello, doctor!',
    dateEnvoi: new Date(),
    seen: false,
  });
});
