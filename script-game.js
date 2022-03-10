const codeShown = document.getElementById("words");
const codeEntered = document.getElementById("input");
const recycleBtn = document.getElementById("recycle");
const startBtn = document.getElementById("start");
const countDownTimer = document.getElementById("timer");
document.getElementById("start").disabled = false;
let time = 0;
let startTime = 0;
let gameWin = false;
let gameLose = false;
let timeDuration = null;

let sampleArr = ["win", "lose", "test"];
let arrayOfCode = [
    "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber));",
    "const array1 = ['a', 'b', 'c', 'd', 'e']; console.log(array1.copyWithin(0, 3, 4)); console.log(array1.copyWithin(1, 3));",
    "const isBelowThreshold = (currentValue) => currentValue < 40; const array1 = [1, 30, 39, 29, 10, 13]; console.log(array1.every(isBelowThreshold));",
    "const array1 = [1, 2, 3]; console.log(array1.includes(2)); const pets = ['cat', 'dog', 'bat']; console.log(pets.includes('cat'));"
]

recycleBtn.addEventListener('click', () => {
    countDownTimer.innerHTML = '';
    document.getElementById("input").disabled = true;
    document.getElementById("start").disabled = false;
    detectCode();
});

startBtn.addEventListener('click', () => {
    document.getElementById("recycle").disabled = true;
    time = 0;
    startTime = 0;
    gameWin = false;
    gameLose = false;
    gameStart();
});

// This function gets a random code from the arrayOfCode and breaks down the string into letters
// For each letter, a span is being created containing that letter and is appended to
// the html of the element id "words"
function detectCode() {
    document.getElementById("words").innerHTML = sampleArr[Math.floor(Math.random() * sampleArr.length)];
    // document.getElementById("words").innerHTML = arrayOfCode[Math.floor(Math.random() * arrayOfCode.length)];
    const codeToType = document.getElementById("words").innerHTML;
    codeShown.innerHTML = '';
    codeToType.replace(/&lt;/g,"<").replace(/&gt;/g,">").split('').forEach(letter => {
        if (letter === ";") {
            const letterSpan = document.createElement('span');
            const breakSpan = document.createElement('br');
            letterSpan.innerHTML = letter;
            codeShown.appendChild(letterSpan);
            codeShown.appendChild(breakSpan);
        } else {
            const letterSpace = document.createElement('span');
            letterSpace.innerHTML = letter;
            codeShown.appendChild(letterSpace);
        }
    });
    codeEntered.value = null;
}

function gameStart() {
    timeDuration = setInterval(startTimer, 1000);
    document.getElementById("start").disabled = true;
    startTime = 5;

    function startTimer() {
        let seconds = startTime % 60;
        if (startTime >= 0 && gameWin === false && gameLose === false) {
            seconds = '0' + seconds;
            countDownTimer.innerHTML = `Game Starting in: ${seconds}`;
            startTime--;
        } else if (gameWin === true || gameLose === true){
            clearInterval(timeDuration);
        }

        if (countDownTimer.innerHTML === 'Game Starting in: 00') {
            clearInterval(timeDuration);
            countDownTimer.innerHTML = '';
            document.getElementById("input").disabled = false;
            time = 60;
            timeDuration = setInterval(gameTimer, 1000);
        }
    }

    function gameTimer() {
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        if (time >= 0 && gameWin === false && gameLose === false) {
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            countDownTimer.innerHTML = `Timer: ${minutes}:${seconds}`;
            time--;
        } else if (gameWin === true || gameLose === true){
            clearInterval(timeDuration);
        }
    }

    codeEntered.addEventListener('input', () => {
        let win = true;
        const arrayCode = codeShown.querySelectorAll('span');
        const arraySplit = codeEntered.value.split('');
        arrayCode.forEach((letterSpan, index) => {
            const letter = arraySplit[index];
            if (letter === letterSpan.innerHTML) {
                letterSpan.classList.add('right');
                letterSpan.classList.remove('wrong');
            } else if (letter == null){
                letterSpan.classList.remove('right');
                letterSpan.classList.remove('wrong');
                win = false;
            } else if (letter === ">" || letter === "<"){
                if (letter === letterSpan.innerText){
                    letterSpan.classList.add('right');
                    letterSpan.classList.remove('wrong');
                } else {
                    letterSpan.classList.add('wrong');
                    letterSpan.classList.remove('right');
                    win = false;
                }
            } else {
                if (letterSpan.innerHTML === " "){
                    letterSpan.classList.add('right');
                    letterSpan.classList.remove('wrong');
                } else {
                    letterSpan.classList.add('wrong');
                    letterSpan.classList.remove('right');
                    win = false;
                }
            }
        });
    
        if (win) {
            alert("You completed the game succesfully!");
            document.getElementById("input").disabled = true;
            document.getElementById("recycle").disabled = false;
            gameWin = true;
        }
    });
    

    
}

detectCode();