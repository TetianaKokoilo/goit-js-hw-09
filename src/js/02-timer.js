import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = Date.now();
    const timeEnd = convertMs(selectedDates[0] - currentDate);

    if (selectedDates[0] <= currentDate) {
      Notify.info('Please choose a date in the future');
      return;
    } else {
      startBtn.disabled = false;
      makeTimer(timeEnd);
    }
  },
};

const launch = flatpickr(dateTimePicker, options);
let timerId = null;
startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  updateTimer();
  timerId = setInterval(updateTimer, 1000);

  startBtn.disabled = true;
}

function makeTimer({ days, hours, minutes, seconds }) {
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
}

function updateTimer() {
  const timeEnd = launch.selectedDates[0] - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeEnd);
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    clearInterval(timerId);
    return;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
