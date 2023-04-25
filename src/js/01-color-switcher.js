
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function onStart() {
    timerId = setInterval(getRandomHexColor, 500);
};

function onStop() {
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}