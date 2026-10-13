// CORRECT ANSWER ANIMATION
// function launchFireworks() {
//     const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

//     for (let burst = 0; burst < 3; burst ++) {
//         setTimeout(() => {
//             const centerX = Math.random()* window.innerWidth;
//             const centerY = Math.random()* window.innerHeight * 0.6;

//             for (let i = 0; i < 36; i++) {
//                 const particle = document.createElement("div");

//                 particle.className = "firework-particle";

//                 particle.style.left = centerX + "px"
//                 particle.style.top = centerY + "px"

//                 const color = colors[Math.floor(Math.random() * colors.length)];
//                 particle.style.backgroundColor = color;
//                 particle.style.color = color;
//                 const angle = (Math.PI * 2 * i) / 36;
//                 const distance = 40 + Math.random() * 80;

//                 particle.style.setProperty(
//                     "--x", Math.cos(angle) * distance + "px"
//                     );i

//                 particle.style.setProperty(
//                     "--y", Math.sin(angle) * distance + "px"
//                 );
//                     document.body.appendChild(particle);
//                     setTimeout(() => particle.remove(), 1100);                
//             }
//         }, burst * 300);
//     }
// }


function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}
// END AMIMATION

let num1, num2;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;

// start game
function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    num1 = Math.floor(Math.random() * level + 1);
    num2 = Math.floor(Math.random() * level + 1);
    document.getElementById("question").innerText = 
            "what is " + num1 + " * " + num2 + "?";

    document.getElementById("answer").value = "";
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }
    let answerInput = document.getElementById("answer");
    // dont accept empty answer
    if (answerInput.value ==="") {
        return;
    }

  let userAnswer = Number(answerInput.value);
  let correctAnswer = num1 * num2;
//   correct answer

  if (userAnswer === correctAnswer){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!  ✔ 👍 🎉";
    message.style.color = "green"

    launchFireworks();

    // // Play MP3
    // correctSound.currentTime = 0;
    // correctSound.play();

    // wrong answer
  } else{
    document.getElementById("message").innerText =
     "Wrong! ❌ 😜 Correct Answer: " + correctAnswer;
    message.style.color = "red"


    //   // Play MP3
    // wrongSound.currentTime = 0;
    // wrongtSound.play();
  }
//   next question
  setTimeout(function () {
    if (gameStarted) {
        nextQuestion();
    }
  }, 1);
} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );
