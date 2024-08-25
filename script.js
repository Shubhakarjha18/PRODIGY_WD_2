// script.js

let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Function to start or pause the stopwatch
function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

// Function to reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
    lapCounter = 0;
}

// Function to record lap time
function lap() {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Function to update the displayed time
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

// Event listeners for buttons
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
