fetch('/users')
.then(response => response.json())
.then(users => {
    //console.log(users);
const userList = document.querySelector('.users');
users.forEach(user => {
    const li = document.createElement('li');
    //li.textContent = user;
    li.innerHTML = `<a href="/chat?user=${user}">${user}</a>`;
    userList.appendChild(li);
});
})
.catch(error => console.error(error));