/* ==========================================
   TYPEFLOW
   PREMIUM TYPING TEST
========================================== */

/* -----------------------------
   ELEMENTS
----------------------------- */

const hero =
document.getElementById("hero");

const typingArea =
document.getElementById("typingArea");

const resultScreen =
document.getElementById("resultScreen");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const paragraph =
document.getElementById("paragraph");

const input =
document.getElementById("typingInput");

const timer =
document.getElementById("time");

const progress =
document.getElementById("progressBar");

const wpmDisplay =
document.getElementById("wpm");

const accuracyDisplay =
document.getElementById("accuracy");

const errorDisplay =
document.getElementById("errors");

const finalWPM =
document.getElementById("finalWPM");

const finalAccuracy =
document.getElementById("finalAccuracy");

const betterPercent =
document.getElementById("betterPercent");

const comparisonText =
document.getElementById("comparisonText");

const performanceMessage =
document.getElementById("performanceMessage");

/* -----------------------------
   SETTINGS
----------------------------- */

const TEST_TIME = 60;

const AVERAGE_WPM = 40;

/* -----------------------------
   GAME VARIABLES
----------------------------- */

let timeLeft = TEST_TIME;

let timerRunning = false;

let interval = null;

let currentParagraph = "";

let totalTyped = 0;

let correctChars = 0;

let incorrectChars = 0;

let currentIndex = 0;

/* -----------------------------
   PARAGRAPHS
----------------------------- */

const paragraphs = [

"The future belongs to those who keep learning every single day.",

"Artificial intelligence is transforming the way humans solve problems.",

"Typing accurately is more important than typing quickly because precision creates better results.",

"Small improvements repeated every day create remarkable success over time.",

"Programming teaches us to think logically while solving creative problems."

];

/* -----------------------------
   START BUTTON
----------------------------- */

startBtn.addEventListener(

"click",

startTest

);

/* -----------------------------
   RESTART
----------------------------- */

restartBtn.addEventListener(

"click",

()=>{

location.reload();

}

);

/* -----------------------------
   START TEST
----------------------------- */

function startTest(){

hero.classList.add("hidden");

typingArea.classList.remove("hidden");

resultScreen.classList.add("hidden");

loadParagraph();

input.focus();

startTimer();

}

/* -----------------------------
   LOAD PARAGRAPH
----------------------------- */

function loadParagraph(){

currentParagraph =

paragraphs[
Math.floor(
Math.random()*paragraphs.length
)
];

paragraph.innerHTML = "";

currentParagraph.split("").forEach(letter=>{

const span = document.createElement("span");

span.innerText = letter;

paragraph.appendChild(span);

});

paragraph.querySelector("span").classList.add("current");

}

/* ==========================================
   TIMER
========================================== */

function startTimer(){

    if(timerRunning) return;

    timerRunning = true;

    interval = setInterval(()=>{

        timeLeft--;

        timer.innerText = timeLeft;

        progress.style.width =
        ((TEST_TIME-timeLeft)/TEST_TIME)*100 + "%";

        if(timeLeft<=0){

            clearInterval(interval);

            finishTest();

        }

    },1000);

}

/* ==========================================
   TYPING ENGINE
========================================== */

input.addEventListener("input",checkTyping);

function checkTyping(){

    const typedText = input.value;

    const letters = paragraph.querySelectorAll("span");

    correctChars = 0;

    incorrectChars = 0;

    letters.forEach((letter,index)=>{

        letter.classList.remove(

            "correct",
            "incorrect",
            "current"

        );

        const typedChar = typedText[index];

        if(typedChar==null){

            if(index===typedText.length){

                letter.classList.add("current");

            }

            return;

        }

        if(typedChar===letter.innerText){

            letter.classList.add("correct");

            correctChars++;

        }

        else{

            letter.classList.add("incorrect");

            incorrectChars++;

        }

    });

    totalTyped = typedText.length;

    updateStats();

    if(totalTyped===currentParagraph.length){

        loadParagraph();

        input.value="";

    }

}

/* ==========================================
   LIVE STATS
========================================== */

function updateStats(){

    const minutes =

    (TEST_TIME-timeLeft)/60;

    let wpm = 0;

    if(minutes>0){

        wpm =

        Math.round(

        (correctChars/5)

        /minutes

        );

    }

    if(wpm<0){

        wpm=0;

    }

    wpmDisplay.innerText=wpm;

    const accuracy=

    totalTyped===0

    ?100

    :Math.round(

    (correctChars/totalTyped)

    *100

    );

    accuracyDisplay.innerText=

    accuracy+"%";

    errorDisplay.innerText=

    incorrectChars;

}

/* ==========================================
   FINISH TEST
========================================== */

function finishTest(){

    typingArea.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    const finalWpm=

    parseInt(

    wpmDisplay.innerText

    );

    const finalAcc=

    accuracyDisplay.innerText;

    finalWPM.innerText=

    finalWpm;

    finalAccuracy.innerText=

    finalAcc;

    calculateRanking(finalWpm);

}

/* ==========================================
   RANKING SYSTEM
========================================== */

function calculateRanking(wpm){

    let better = 0;

    if(wpm <= 10) better = 2;
    else if(wpm <= 20) better = 8;
    else if(wpm <= 30) better = 20;
    else if(wpm <= 40) better = 40;
    else if(wpm <= 50) better = 60;
    else if(wpm <= 60) better = 75;
    else if(wpm <= 70) better = 85;
    else if(wpm <= 80) better = 91;
    else if(wpm <= 90) better = 95;
    else if(wpm <= 100) better = 98;
    else if(wpm <= 120) better = 99;
    else better = 99.9;

    betterPercent.innerText = better + "%";

    const faster =

    Math.max(
        0,
        Math.round(
        ((wpm-AVERAGE_WPM)/AVERAGE_WPM)*100
        )
    );

    comparisonText.innerHTML =

    `
    🌍 Average Typing Speed:
    <strong>${AVERAGE_WPM} WPM</strong>

    <br><br>

    🚀 You typed
    <strong>${faster}% faster</strong>
    than the average typist.
    `;

    if(wpm<25){

        performanceMessage.innerText=
        "Keep Practicing!";

    }

    else if(wpm<50){

        performanceMessage.innerText=
        "Good Progress!";

    }

    else if(wpm<80){

        performanceMessage.innerText=
        "Excellent Typist!";

    }

    else{

        performanceMessage.innerText=
        "Elite Typist 👑";

    }

    saveBestScore(wpm);

    unlockAchievement(wpm);

}

/* ==========================================
   SAVE BEST SCORE
========================================== */

function saveBestScore(score){

    const best =

    localStorage.getItem("bestScore");

    if(best==null || score>best){

        localStorage.setItem(

            "bestScore",

            score

        );

    }

}

/* ==========================================
   ACHIEVEMENT
========================================== */

function unlockAchievement(wpm){

    const popup =

    document.getElementById(
        "achievementPopup"
    );

    let achievement="";

    if(wpm>=100){

        achievement="👑 Keyboard Legend";

    }

    else if(wpm>=80){

        achievement="🏆 Elite Typist";

    }

    else if(wpm>=60){

        achievement="⚡ Fast Fingers";

    }

    else if(wpm>=40){

        achievement="🎯 Above Average";

    }

    else{

        achievement="🌱 First Steps";

    }

    popup.innerText=

    achievement;

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },3500);

}

/* ==========================================
   SHARE RESULT
========================================== */

document

.getElementById("shareBtn")

.addEventListener(

"click",

()=>{

const text =

`⌨️ I just scored ${finalWPM.innerText} WPM on TypeFlow!

🏆 Better than ${betterPercent.innerText} of typists.

🌍 Average Typing Speed: 40 WPM.

🚀 Can you beat me?`;

navigator.clipboard.writeText(text);

alert("Result copied!");

}

);

/* ==========================================
   DARK MODE
========================================== */

const themeButton=

document.getElementById(

"themeToggle"

);

themeButton.onclick=()=>{

document.body.classList.toggle(

"dark"

);

};

