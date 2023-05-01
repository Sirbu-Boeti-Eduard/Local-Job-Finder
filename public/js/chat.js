const socket = io();
const messageList1 = document.getElementById('messages1');
const messageList2 = document.getElementById('messages2');

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

fetch("/history?user=" + encodeURIComponent(user))
.then(response => response.json())
.then(messages => {
const messageList1 = document.getElementById('messages1');
const messageList2 = document.getElementById('messages2');
messages.forEach(message => {
    const li = document.createElement('li');
    if(username === message.username1){
        messageList1.appendChild(createMessageElement("You", message.message));
        messageList2.appendChild(createEmpty());
    }
    else{
        messageList2.appendChild(createMessageElement(message.username1, message.message));
        messageList1.appendChild(createEmpty());
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
        messageList1.appendChild(createMessageElement("You", msg));
        messageList2.appendChild(createEmpty());
    }
    else{
        messageList2.appendChild(createMessageElement(username1, msg));
        messageList1.appendChild(createEmpty());
    }
    //console.log(username1, username2);

});

function createMessageElement(sender, message) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${sender}:</b> ${message}`;
    return li;
}

function createEmpty(){
    const li = document.createElement('li');
    li.innerHTML = `<br>`;
    return li;
}