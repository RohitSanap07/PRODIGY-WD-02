let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1000);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / 3600000);
    let minutes = Math.floor((difference % 3600000) / 60000);
    let seconds = Math.floor((difference % 60000) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    lapCounter = 1;
}

function lapTime() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${timeDisplay.innerHTML}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapTime);
