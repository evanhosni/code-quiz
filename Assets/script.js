var questionsArray = [
    {
        question: 'what is the worst eating utencil',
        answers: ['fork','spoon','knife',],
        correctAnswer: 'spoon'
    },
    {
        question: 'what kind of car',
        answers: ['gti','minivan','bus','scotts civic'],
        correctAnswer: 'gti'
    },
    {
        question: 'hmmm?',
        answers: ['YES','yeah kinda','nah','no'],
        correctAnswer: 'YES'
    }
];
var score = 0;
var timeLeft = 59;
var highScores = [];

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("timer-div").style.display = "block";
    document.getElementById("quiz").style.display = "block";
    nextQuestion()
    timer()
}

function nextQuestion() {
    if (questionsArray.length == 0) {
        gameOver()
    } else {
        var q = questionsArray[Math.floor(Math.random()*questionsArray.length)]
        var a = q.answers
        document.getElementById("question").textContent = q.question;
        document.getElementById("answers").textContent = ''
        for (let i = 0; i < a.length; i++) {
            let btn = document.createElement("button")
            document.getElementById("answers").appendChild(btn)
            //btn.innerHTML = a[Math.floor(Math.random()*a.length)]//come back to this//TODO - how do i randomize order of answers?
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


function correctAnswer() {
    console.log('yay')
    nextQuestion()
}

function incorrectAnswer() {
    // console.log('sad')
    timeLeft -= 10;
    document.getElementById("timer").textContent = timeLeft;
    nextQuestion()
}

function gameOver() {
    console.log('done')
    score = timeLeft
    document.getElementById("quiz").style.display = "none";
    document.getElementById("timer-div").style.display = "none";
    document.getElementById("score-div").style.display = "block";
    document.getElementById("score").textContent = score
    document.getElementById("initials").style.display = "block";
}

function storeInitials() {
    event.preventDefault();//why do i get warning: "'event' is depreciated. ts(6385)"?
    var scoreList = localStorage.getItem('storedScores')
    if (scoreList !== null) {
        highScores = JSON.parse(localStorage.getItem('storedScores'));
    }
    highScores.push([document.getElementById("initials-form").value,score])
    // highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('storedScores',JSON.stringify(highScores));
    showHighScores()
}

function showHighScores() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("initials").style.display = "none";
    document.getElementById("high-scores").style.display = "block";
    document.getElementById("high-scores-list").textContent = "";
    highScores = JSON.parse(localStorage.getItem('storedScores'));
    if (highScores !== null) {
        document.getElementById("no-high-scores").style.display = "none";
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
    document.getElementById("timer").textContent = timeLeft + 1;
    var countdown = setInterval(function() {
        if(timeLeft <= 0){
            clearInterval(countdown);
            document.getElementById("timer").textContent = 0;
        }
        document.getElementById("timer").textContent = timeLeft;
        timeLeft -= 1;
    }, 1000);
}