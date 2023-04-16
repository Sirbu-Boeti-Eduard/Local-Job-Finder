const form = document.querySelector('form');
let input = form.querySelector('#job');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    input.value = input.value.toLowerCase();
    form.submit();
});