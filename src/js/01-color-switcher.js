const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function backgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function onStart() {
    timerId = setInterval(backgroundColor, 500);

    btnStart.toggleAttribute('disabled');
};

function onStop() {
    clearInterval(timerId);

    btnStart.removeAttribute('disabled');
}