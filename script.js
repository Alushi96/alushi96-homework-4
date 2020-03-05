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
   totalSeconds = totalSeconds - 10;
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

//Question

var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var b1 = document.getElementById("choice1");
var b2 = document.getElementById("choice2");
var b3 = document.getElementById("choice3");
var b4 = document.getElementById("choice4");



let questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        b1 : "javascript",
        b2 : "scripting",
        b3 : "script",
        b4 : "js",
        correct : "b3",
    },
    {
        question : "What is the correct syntax for referring to an external script called 'xxx.js'?",
        b1 : "script href='xxx.js'",
        b2 : "script src='xxx.js'",
        b3 : "script name='xxx.js'",
        b4 : "script alt='xxx.js'",
        correct : "b2",
    },
    {
        question : "How do you write 'Hello World' in an alert box?",
        b1 : "msg('Hello World');",
        b2 : "msgBox('Hello World');",
        b3 : "alertBox('Hello World');",
        b4 : "alert('Hello World');",
        correct : "b4",
    },
    {
        question : "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        b1 : "if ( i != 5)",
        b2 : "if (i <> 5)",
        b3 : "if i <> 5",
        b4 : "if i = ! 5 then",
        correct : "b1",
    }
];

var lastquestion = questions.length - 1;
let runningQuestion = 0;

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    b1.innerHTML = q.b1;
    b2.innerHTML = q.b2;
    b3.innerHTML = q.b3;
    b4.innerHTML = q.b4;
}

var scoreDisplay = document.querySelector("#scores");
var score = 0;


//Check Answsers

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct){
        answerCorrect();
       console.log("correct");
    }
    else {
        answerWrong();
        
        
    }
    if (runningQuestion < lastquestion) {
        runningQuestion++;
        renderQuestion();    
    } 
    else {
        stopTimer();
        finalscore.style.display = "block";
        quiz.style.display = "none";
        fiscore();
    }
}

function answerCorrect() {
   score++;
   scoreDisplay.textContent = score;
   var progs = setTimeout(function() {
    prog.textContent = "Correct!!";
}, 200);

clearint();
   console.log(score);
}


function answerWrong(){
   var progs = setTimeout(function() {
        prog.textContent = "Wrong!!";
    },200);

   clearint();

    subsec();
    console.log("Wrong");
    
}

function clearint(){
 setTimeout(function() {
     prog.textContent = "";
 },1000);
    
}

//Start Quiz

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    startTimer();
   quiz.style.display = "block";
}
start.addEventListener("click",startQuiz);

//Highscores

var finalcore = document.querySelector("#finalcore");

function fiscore() {
   finalcore.textContent = "Your final score is : " + score;
    console.log(finalcore);
}

//Submit

var initialinput = document.querySelector("#initials");
var submitbtn = document.querySelector("#submit");


submitbtn.addEventListener("click", function(event) {
    event.preventDefault();
    head.style.display= "none";
    finalscore.style.display= "none";
    highscore.style.display= "block";

    var user =  initialinput.value.trim() +" : " + score;
    if (user === "") {
        return;
    }

    hscores.push(user);
    initialinput.value = "";
    
    console.log(user)

    storeName();
    renderHighscore();
})

//Save to Storage

function storeName() {
    localStorage.setItem("user", JSON.stringify(hscores));
}

//Bring from storage

var highscorelist = document.querySelector("#highscorelist");
var hscores = [];
init();

function renderHighscore() {
    
    highscorelist.innerHTML = "";

    for (var i = 0; i < hscores.length; i++) {
        var hscore = hscores[i];

        var li = document.createElement("li");
        li.textContent = hscore;

        highscorelist.appendChild(li);
    
    }
}


function init() {
    var storeduser = JSON.parse(localStorage.getItem("user"));

    if (storeduser !==null) {
        hscores = storeduser;


        renderHighscore();
    }
}

//Startover Button

var startover = document.querySelector("#back");

startover.addEventListener("click", function() {
    start.style.display="block";
    quiz.style.display="none";
   finalscore.style.display="none";
    head.style.display="block";
    highscore.style.display="none";
    stopTimer();
    clear();
    score = 0;
})

function clear() {
    scoreDisplay.textContent = 0;
    runningQuestion = 0;
}


//Clear Name Button

var clearbtn = document.querySelector("#clear");

clearbtn.addEventListener("click", function() {
    var element = event.target;

    hscores.splice(hscores);
    storeName();
    renderHighscore();
})