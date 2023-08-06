const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
let intervalID = null;
stopBtn.disabled = true;

const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', e => {
  intervalID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.target.setAttribute('disabled', true);
  e.target.nextElementSibling.removeAttribute('disabled');
});

stopBtn.addEventListener('click', e => {
  clearInterval(intervalID);
  e.target.setAttribute('disabled', true);
  e.target.previousElementSibling.removeAttribute('disabled');
});
