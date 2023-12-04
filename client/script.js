const socket = io('http://localhost:3000', {
    transports: ['websocket'],
});
socket.on('connect', () => {
    console.log('Connected to server');
});

const senderInput = document.getElementById('sender');
const receiverInput = document.getElementById('receiver');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const sender = senderInput.value;
    const receiver = receiverInput.value;
    const message = messageInput.value;

    if (sender && receiver && message) {
        socket.emit('join', sender);
        socket.emit('join', receiver);
        socket.emit('message', {
            sender,
            receiver,
            message
        });
        // appendMessage(sender, message);
        messageInput.value = '';
    } else {
        console.log('Please fill in sender, receiver, and message fields.');
    }
});

socket.on('message', (data) => {
    const {
        sender,
        message
    } = data;
    appendMessage(sender, message);
});

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = `${sender}: ${message}`;
    messagesDiv.appendChild(messageDiv);
}