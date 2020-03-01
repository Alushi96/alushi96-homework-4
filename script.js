var secondsDisplay = document.querySelector("#seconds");
var startbutton = document.querySelector("#b1");

var secondsElapsed = 0;
var totalSeconds = 90;
var interval;


function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 100;

    var formattedSeconds;

    if (secondsLeft <10) {
        formattedSeconds = "0" + secondsLeft;
    }
    else {
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

function renderTime() {
    secondsDisplay.textContent = getFormattedSeconds();

    if (secondsElapsed >=totalSeconds) {
        alert("All done!!");
        stopTimer();
    }
}

function startTimer() {

    if (totalSeconds > 0) {
        interval = setInterval(function() {
            secondsElapsed++;
            renderTime();
        }, 1000);
    }
}

function stopTimer() {
    secondsElapsed = 0;
    renderTime();
}


startbutton.addEventListener("click", startTimer);