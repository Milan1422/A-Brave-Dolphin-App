const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const socket = io();


// message from server
socket.on('message', message => {
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

})

// message submit
chatForm.addEventListener('submit', (e) => {
    // prevent page from refresh after submit
    e.preventDefault();
    // grabs the text from chatbox
    const msg = e.target.elements.msg.value;
    // emits msg to server
    socket.emit('chatMessage', msg);
    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

})


// output message to chatbox
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}