//Timer

var secondsDisplay = document.querySelector("#seconds");
var secondsElapsed = 0;
var totalSeconds = 90;
var interval;


function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed);

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
        finalscore.style.display = "block";
        quiz.style.display = "none";
        fiscore();
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

function subsec(){
    var subtract = totalSeconds - 10000;
    console.log("sub")
}

function stopTimer() {
  secondsElapsed = 0;
    renderTime();
    clearInterval(interval);
}


//Highscore Button

var hbtn = document.querySelector("#title");
hbtn.addEventListener("click", function() {
    start.style.display="none";
    quiz.style.display="none";
   finalscore.style.display="none";
    head.style.display="none";
    highscore.style.display="block";
    init();
    stopTimer();
})