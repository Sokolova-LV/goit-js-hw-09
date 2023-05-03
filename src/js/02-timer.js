import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import convertMs from "./02-addition";

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

startBtn.setAttribute('disabled', true);
flatpickr(input, options);
startBtn.addEventListener('click', onStartBtn);

window.addEventListener('keydown', evt => {
  if(evt.code === 'Escape' && timerId) {
    clearInterval(timerId);

    input.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);

    dataSeconds.textContent = '00';
    dataMinutes.textContent = '00';
    dataHours.textContent = '00';
    dataDays.textContent = '00';
  }
})

function onStartBtn() {
  timerId = setInterval(startTimer, 1000);
}

function differenceDate(selectedDates) {
  const currentDate = Date.now();

  if(selectedDates < currentDate) {
    startBtn.setAttribute('disabled', true);
    return Notiflix.Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  resultDate = convertMs(timeDifference);

  renderDate(resultDate);
  startBtn.removeAttribute('disabled');
} 

function startTimer() {
  startBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);

  timeDifference -= 1000;

  if(dataSeconds.textContent <= 0 && dataMinutes.textContent <= 0) {
    Notiflix.Notify.success('Time end!');
    clearInterval(timerId);
  } else {
    resultDate = convertMs(timeDifference);
    renderDate(resultDate);
  }
}

function renderDate(resultDate) {
  dataSeconds.textContent = resultDate.seconds;
  dataMinutes.textContent = resultDate.minutes;
  dataHours.textContent = resultDate.hours;
  dataDays.textContent = resultDate.days;
}