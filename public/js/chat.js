const socket = io();
const messageList = document.getElementById('messages');

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

fetch("/history?user=" + encodeURIComponent(user))
.then(response => response.json())
.then(messages => {

messages.forEach(message => {
    const li = document.createElement('li');
    if(username === message.username1){
        messageList.appendChild(createMessageElementYou(message.message));
        messageList.appendChild(createEmpty());
    }
    else{
        messageList.appendChild(createMessageElementUser(message.message));
        messageList.appendChild(createEmpty());
    }
    //userList.appendChild(li);
});
})
.catch(error => console.error(error));

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;

    const urlParams = new URLSearchParams(window.location.search);

    const username1 = username;
    const username2 = urlParams.get('user');

    socket.emit('chat message', message, username1, username2);
    messageInput.value = '';
    //messageList.appendChild(createMessageElement(username, message));
});

socket.on('chat message', (msg, username1, username2) => {
    if(username1 === username){
        messageList.appendChild(createMessageElementYou(msg));
        messageList.appendChild(createEmpty());
    }
    else{
        messageList.appendChild(createMessageElementUser(msg));
        messageList.appendChild(createEmpty());
    }

});

function createMessageElementYou(message) {
    const div = document.createElement('div');
    div.innerHTML = `${message}`;
    div.id = 'you';
    return div;
}

function createMessageElementUser(message) {
    const div = document.createElement('div');
    div.innerHTML = `${message}`;
    div.id = 'user';
    return div;
}

function createEmpty(){
    const div = document.createElement('div');
    div.innerHTML = `<br>`;
    div.id = 'empty';
    return div;
}