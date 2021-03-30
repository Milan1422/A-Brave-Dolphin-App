const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
})

// message submit
chatForm.addEventListener('submit', (e) => {
    // prevent page from refresh after submit
    e.preventDefault();
    // grabs the text from chatbox
    const msg = e.target.elements.msg.value;
    // emits msg to server
    socket.emit('chatMessage', msg);
})