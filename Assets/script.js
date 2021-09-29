var questionsArray = [
    {
        image: './Assets/spork.png',
        question: 'what is most overrated utencil',
        answers: ['fork','spoon','knife',],
        correctAnswer: 'spoon'
    },
    {
        image: './Assets/cat.png',
        question: 'whats his name',
        answers: ['rafeek','glenn','milkshakes','grandpa'],
        correctAnswer: 'milkshakes'
    },
    {
        image: './Assets/nose.png',
        question: 'whose nose',
        answers: ['bird','cow','dog','pig'],
        correctAnswer: 'pig'
    },
    {
        image: './Assets/xbox.png',
        question: 'wanna play',
        answers: ['no','yeah kinda','after my chores'],
        correctAnswer: 'after my chores'
    },
    {
        image: './Assets/lemon.png',
        question: 'what is lemon',
        answers: ['meat','citrus','friend','vegetable'],
        correctAnswer: 'citrus'
    },
    {
        image: './Assets/snowman.png',
        question: 'what move is this',
        answers: ['dab','floss','dougie','nae nae'],
        correctAnswer: 'dab'
    }
];
var score = 0;
var timeLeft = 59;
var highScores = [];
var quizFinished = false;
var startScreen = document.getElementById("start-screen")
var quizScreen = document.getElementById("quiz")
var initialsScreen = document.getElementById("initials")
var highScoresScreen = document.getElementById("high-scores")
var timerDiv = document.getElementById("timer-div")
var timerContent = document.getElementById("timer")
var scoreDiv = document.getElementById("score-div")
var scoreContent = document.getElementById("score")
var toast = document.getElementById("toast")


function startQuiz() {
    startScreen.style.display = "none";
    timerDiv.style.display = "block";
    quizScreen.style.display = "block";
    nextQuestion()
    timer()
}

function nextQuestion() {
    if (questionsArray.length == 0) {
        gameOver()
    } else {
        var q = questionsArray[Math.floor(Math.random()*questionsArray.length)]
        var a = shuffle(q.answers)
        document.getElementById("image").src = q.image;
        document.getElementById("question").textContent = q.question;
        document.getElementById("answers").textContent = ''
        for (let i = 0; i < a.length; i++) {
            let btn = document.createElement("button")
            document.getElementById("answers").appendChild(btn)
            btn.innerHTML = a[i]
            if (btn.innerHTML == q.correctAnswer) {
                btn.addEventListener("click",correctAnswer)
            } else {
                btn.addEventListener("click",incorrectAnswer)
            }
        }
        questionsArray.splice(questionsArray.indexOf(q), 1)
    }
}

function shuffle(array) {
var m = array.length, temp, i;
    while (m > 0) {
        i = Math.floor(Math.random() * m);
        m--;
        temp = array[m];
        array[m] = array[i];
        array[i] = temp;
    }
    return array;
}

function correctAnswer() {
    toast.textContent = "👍"
    toast.className = "show-good";
    setTimeout(function(){ toast.className = toast.className.replace("show-good", ""); }, 500);
    nextQuestion()
}

function incorrectAnswer() {
    timeLeft -= 10;
    timerContent.textContent = timeLeft;
    toast.textContent = "👎"
    toast.className = "show-bad";
    setTimeout(function(){ toast.className = toast.className.replace("show-bad", ""); }, 500);
    nextQuestion()
}

function gameOver() {
    console.log('done')
    quizFinished = true;
    score = timeLeft
    quizScreen.style.display = "none";
    timerDiv.style.display = "none";
    scoreDiv.style.display = "block";
    scoreContent.textContent = score
    initialsScreen.style.display = "block";
}

function storeInitials() {
    event.preventDefault();//why do i get warning: "'event' is depreciated. ts(6385)"?
    var scoreList = localStorage.getItem('storedScores')
    if (scoreList !== null) {
        highScores = JSON.parse(localStorage.getItem('storedScores'));
    }
    highScores.push([document.getElementById("initials-form").value,score])
    highScores.sort((a, b) => b[1] - a[1]);
    if (highScores.length > 10) {
        highScores.splice(-1)
    }
    localStorage.setItem('storedScores',JSON.stringify(highScores));
    showHighScores()
}

function showHighScores() {
    startScreen.style.display = "none";
    quizScreen.style.display = "none";
    initialsScreen.style.display = "none";
    highScoresScreen.style.display = "block";
    document.getElementById("high-scores-list").textContent = "";
    highScores = JSON.parse(localStorage.getItem('storedScores'));
    if (highScores !== null) {
        document.getElementById("no-high-scores").style.display = "none";
        highScores.sort((a, b) => b[1] - a[1]);
        for (let i = 0; i < highScores.length; i++) {
            var scoresLi = document.createElement("li")
            document.getElementById("high-scores-list").appendChild(scoresLi)
            scoresLi.textContent = highScores[i].join(" --- ")
        }
    } else {
        document.getElementById("no-high-scores").style.display = "block";
    }

}

function refresh(){
    window.location.reload();
} 

function timer() {
    timerContent.textContent = timeLeft + 1;
    var countdown = setInterval(function() {
        if(timeLeft <= 0){
            clearInterval(countdown);
            timerContent.textContent = 0;
            if (!quizFinished) {
                gameOver()
            }
        }
        timerContent.textContent = timeLeft;
        timeLeft -= 1;
    }, 1000);
}