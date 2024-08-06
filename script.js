let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let digitalClock = document.getElementById('digital-clock');
let selectedTime = document.getElementById('selected-time');
let timezoneSelect = document.getElementById('timezone-select');

function displayTime() {
    let timeZone = timezoneSelect.value || 'local';
    let date = new Date();

    let hh, mm, ss;

    if (timeZone === 'local') {
        hh = date.getHours();
        mm = date.getMinutes();
        ss = date.getSeconds();
    } else {
        let options = {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Ensure 24-hour format
        };

        let timeString = new Intl.DateTimeFormat('en-US', options).format(date);
        let [hours, minutes, seconds] = timeString.split(':').map(Number);

        hh = hours;
        mm = minutes;
        ss = seconds;
    }

    let hRotation = 30 * hh + mm / 2;
    let mRotation = 6 * mm;
    let sRotation = 6 * ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

    const formattedTime = timeZone === 'local' ? new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Ensure 24-hour format
    }).format(date) : new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Ensure 24-hour format
    }).format(date);

    digitalClock.textContent = formattedTime;
    selectedTime.textContent = timeZone === 'local' ? `Local Time: ${formattedTime}` : `${timezoneSelect.options[timezoneSelect.selectedIndex].text}: ${formattedTime}`;
}

timezoneSelect.addEventListener('change', displayTime);

setInterval(displayTime, 1000);

displayTime();
