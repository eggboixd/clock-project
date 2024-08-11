let startTime;
let updatedTime;
let difference;
let timerInterval;
let savedTime = 0;
let paused = true;

const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function startTimer() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - savedTime;

        timerInterval = setInterval(function() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            timeDisplay.innerHTML = timeToString(difference);
        }, 1000);
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(timerInterval);
        savedTime = difference;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    paused = true;
    savedTime = 0;
    timeDisplay.innerHTML = '00:00:00';
}

function timeToString(time) {
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
