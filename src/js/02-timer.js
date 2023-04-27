
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timerId = null;
let resultDate = null;
let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0])
    differenceDate(selectedDates[0]);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  const days = Math.floor(ms / day);  
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

window.addEventListener('keydown', evt => {
  if(evt.code === 'Escape' && timerId) {
    clearInterval(timerId);

    input.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);

    dataDays.textContent = '00';
    dataHours.textContent = '00';
    dataMinutes.textContent = '00';
    dataSeconds.textContent = '00';
  }
})

function onStartBtn() {
  timerId = setInterval(startTimer, 1000);
}

function differenceDate(selectedDates) {
  const currentDate = Date.now();

  if(selectedDates < currentDate) {
    startBtn.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  resultDate = convertMs(timeDifference);

  renderDate(resultDate);
  startBtn.removeAttribute('disabled');
} 

function startTimer() {
  startBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);

  timeDifference = 1000;

  if(dataSeconds.textContent <= 0 && dataMinutes.textContent <= 0) {
    Notify.success('Time end!');
    clearInterval(timerId);
  } else {
    resultDate = convertMs(timeDifference);
    addLeadingZero(resultDate);
  }
}

function addLeadingZero(resultDate) {
  return string(resultDate).padStart(2, '0');
}