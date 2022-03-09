const codeShown = document.getElementById("words");
const codeEntered = document.getElementById("input");
const recycleBtn = document.getElementById("recycle");
const countDownTimer = document.getElementById("timer");
let time = 60;

let arrayOfCode = [
    "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber)); ",
    "const array1 = ['a', 'b', 'c', 'd', 'e']; console.log(array1.copyWithin(0, 3, 4)); console.log(array1.copyWithin(1, 3));",
    "const isBelowThreshold = (currentValue) => currentValue < 40; const array1 = [1, 30, 39, 29, 10, 13]; console.log(array1.every(isBelowThreshold));",
    "const array1 = [1, 2, 3]; console.log(array1.includes(2)); const pets = ['cat', 'dog', 'bat']; console.log(pets.includes('cat'));"
]

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
        detectCode();
    }
});

recycleBtn.addEventListener('click', () => {
    detectCode();
});

// This function gets a random code from the arrayOfCode and breaks down the string into letters
// For each letter, a span is being created containing that letter and is appended to
// the html of the element id "words"
function detectCode() {
    document.getElementById("words").innerHTML = arrayOfCode[Math.floor(Math.random() * arrayOfCode.length)];
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

function changeTimer() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    countDownTimer.innerHTML = `Timer: ${minutes}:${seconds}`;
    time--;
}

setInterval(changeTimer, 1000);
detectCode();