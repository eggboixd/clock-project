const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
let timerLoop;
let futureTime;
let setTime;

document.addEventListener('DOMContentLoaded', () => {
    resetTimer();
});

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);

function startTimer() {
    if (timerLoop) {
        cancelAnimationFrame(timerLoop);
    }

    const hr = parseInt(document.getElementById('hours-input').value) || 0;
    const min = parseInt(document.getElementById('minutes-input').value) || 0;
    const sec = parseInt(document.getElementById('seconds-input').value) || 0;

    const hours = hr * 3600000;
    const minutes = min * 60000;
    const seconds = sec * 1000;
    setTime = hours + minutes + seconds;
    const startTime = Date.now();
    futureTime = startTime + setTime;

    resetAnimation();

    function countdownTimer() {
        const currTime = Date.now();
        const remainingTime = futureTime - currTime;
        const angle = (remainingTime / setTime) * 360;

        if (angle > 180) {
            semicircles[2].style.display = 'none'; 
            semicircles[0].style.transform = 'rotate(180deg)'; 
            semicircles[1].style.transform = `rotate(${angle}deg)`; 
        } else {
            semicircles[2].style.display = 'block'; 
            semicircles[0].style.transform = `rotate(${angle}deg)`; 
            semicircles[1].style.transform = `rotate(${angle}deg)`; 
        }

        // Timer display
        const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

        timer.innerHTML = `
        <div>${hrs}</div>
        <div class="colon">:</div>
        <div>${mins}</div>
        <div class="colon">:</div>
        <div>${secs}</div>
        `;

        if (remainingTime <= 6000) {
            semicircles[0].style.backgroundColor = "red";
            semicircles[1].style.backgroundColor = "red";
            timer.style.color = "red";
        }

        if (remainingTime <= 0) {
            resetAnimation();
            // Hide semicircles
            //semicircles[0].style.display = 'none';
            //semicircles[1].style.display = 'none';
            //semicircles[2].style.display = 'none';

            timer.innerHTML = `
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
            `;
            timer.style.color = "lightgray";
        } else {
            timerLoop = requestAnimationFrame(countdownTimer);
        }
    }

    countdownTimer();
    resetAnimation();
}

function resetTimer() {
    if (timerLoop) {
        cancelAnimationFrame(timerLoop);
    }

    resetAnimation();
    timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    `;
    timer.style.color = "lightgray";

    document.getElementById('hours-input').value = '';
    document.getElementById('minutes-input').value = '';
    document.getElementById('seconds-input').value = '';
}

function resetAnimation() {
    const hr = parseInt(document.getElementById('hours-input').value) || 0;
    const min = parseInt(document.getElementById('minutes-input').value) || 0;
    const sec = parseInt(document.getElementById('seconds-input').value) || 0;
    
    const hours = hr * 3600000;
    const minutes = min * 60000;
    const seconds = sec * 1000;
    setTime = hours + minutes + seconds;
    
    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
    semicircles[2].style.display = 'block';

    semicircles[0].style.backgroundColor = ''; 
    semicircles[1].style.backgroundColor = ''; 
    semicircles[2].style.backgroundColor = ''; 
    timer.style.color = '';

    const initialAngle = 360; 

    if (initialAngle > 180) {
        semicircles[2].style.display = 'none'; 
        semicircles[0].style.transform = 'rotate(180deg)'; 
        semicircles[1].style.transform = `rotate(${initialAngle}deg)`;
    } else {
        semicircles[2].style.display = 'block'; // white semicircle
        semicircles[0].style.transform = `rotate(${initialAngle}deg)`;
        semicircles[1].style.transform = `rotate(${initialAngle}deg)`; 
    }
}
