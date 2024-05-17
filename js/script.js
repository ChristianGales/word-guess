const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
resetBtn = document.querySelector(".reset"),
checkBtn = document.querySelector(".check-word"),
scoreElement = document.getElementById("score");

let correctWord, timer, score = 0, maxTime = 300;

const startTimer = () => {
    clearInterval(timer); // Ensure any existing timer is cleared before starting a new one
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! Your final score is ${score}`);
        clearInterval(timer);
    }, 1000);
}

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    score++;
    scoreElement.innerText = score;
    initGame();
}

const resetGame = () => {
    score = 0;
    maxTime = 300;
    scoreElement.innerText = score;
    timeText.innerText = maxTime;
    initGame();
    startTimer();
}

resetBtn.addEventListener("click", resetGame);
checkBtn.addEventListener("click", checkWord);

// Initialize the game and start the timer
initGame();
startTimer();
