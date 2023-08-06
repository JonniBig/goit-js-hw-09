import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.getElementById('btn'),
  days: document.querySelector('.days'),
  hours: document.querySelector('.hours'),
  minutes: document.querySelector('.minutes'),
  seconds: document.querySelector('.seconds'),
};
const { inputEl, startBtn, days, hours, minutes, seconds } = refs;

startBtn.disabled = true;
startBtn.addEventListener('click', onClickBtn, { once: true });

let selectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.warning('Please choose a date in the future');
    }
    selectedDate = selectedDates[0].getTime();

    startBtn.disabled = false;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  //   seconds = seconds < 10 ? '0' + seconds : seconds;
  return { days, hours, minutes, seconds };
}

function onClickBtn(e) {
  startBtn.disabled = true;
  const timerInterval = setInterval(() => {
    const timerTime = selectedDate - Date.now();
    const timeInput = convertMs(timerTime);
    if (timerTime < 1000) {
      clearInterval(timerInterval);
      setTimeout(() => {
        Report.warning('Time out!');
      }, 500);
    }
    timer(timeInput);
  }, 1000);
}

function timer(e) {
  days.textContent = addLeadingZero(e.days);
  hours.textContent = addLeadingZero(e.hours);
  minutes.textContent = addLeadingZero(e.minutes);
  seconds.textContent = addLeadingZero(e.seconds);
}

flatpickr(inputEl, options);
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
