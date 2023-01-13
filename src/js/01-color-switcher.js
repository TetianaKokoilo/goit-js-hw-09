import '../css/common.css';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStart);

function onStart(event) {
  stopBtn.disabled = !event.target;
  startBtn.setAttribute('disabled', '');
  changeBgColor();
}


stopBtn.addEventListener('click', onStop);

function onStop(event) {
  startBtn.disabled = !event.target;
  stopBtn.setAttribute('disabled', '');
  clearInterval(timerId);
}

function changeBgColor() {
  return (timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
