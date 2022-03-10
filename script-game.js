const codeShown = document.getElementById("words");
const codeEntered = document.getElementById("input");
const recycleBtn = document.getElementById("recycle");
const startBtn = document.getElementById("start");
const countDownTimer = document.getElementById("timer");
const wpmDiv = document.getElementById("wpm");
const codeHeader = document.getElementById("codeName");
const definitionP = document.getElementById("codeDefinition");
const linkP = document.getElementById("link");
const mistakesDiv = document.getElementById("mistakes");
const accuracyDiv = document.getElementById("accuracy");
const landingBtn = document.getElementById("landing");
document.getElementById("start").disabled = false;
let time = 60;
let startTime = 5;
let gameWin = false;
let gameLose = false;
let mistakeCounter = 0;
let characters = 0;
let seconds;
let arrayOfCode = [
    {
        codeName: "findIndex()",
        codeStructure: "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber));",
        codeDefinition: "The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.",
        codeLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"
    },
    {
        codeName: "copyWithin()",
        codeStructure: "const array1 = ['a', 'b', 'c', 'd', 'e']; console.log(array1.copyWithin(0, 3, 4)); console.log(array1.copyWithin(1, 3));",
        codeDefinition: "The copyWithin() method shallow copies part of an array to another location in the same array and returns it without modifying its length.",
        codeLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin"
    },
    {
        codeName: "every()",
        codeStructure: "const isBelowThreshold = (currentValue) => currentValue < 40; const array1 = [1, 30, 39, 29, 10, 13]; console.log(array1.every(isBelowThreshold));",
        codeDefinition: "The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.",
        codeLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every"
    },
    {
        codeName: "includes()",
        codeStructure: "const array1 = [1, 2, 3]; console.log(array1.includes(2)); const pets = ['cat', 'dog', 'bat']; console.log(pets.includes('cat'));",
        codeDefinition: "The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.",
        codeLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes"
    },
]

landingBtn.addEventListener('click', function(){
    document.location.href = "index.html";
})

recycleBtn.addEventListener('click', () => {
    countDownTimer.innerHTML = '';
    document.getElementById("input").disabled = true;
    document.getElementById("start").disabled = false;
    wpmDiv.innerHTML = ``;
    accuracyDiv.innerHTML = ``;
    mistakesDiv.innerHTML = ``;
    detectCode();
});

startBtn.addEventListener('click', () => {
    document.getElementById("recycle").disabled = true;
    time = 60;
    startTime = 5;
    gameWin = false;
    gameLose = false;
    gameStart();
});

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
                mistakeCounter++;
            }
        } else {
            if (letterSpan.innerHTML === " "){
                letterSpan.classList.add('right');
                letterSpan.classList.remove('wrong');
            } else {
                letterSpan.classList.add('wrong');
                letterSpan.classList.remove('right');
                win = false;
                mistakeCounter++;
            }
        }
    });
    if (win) {
        alert("You completed the game succesfully!");
        document.getElementById("input").disabled = true;
        document.getElementById("recycle").disabled = false;
        wpmDiv.innerHTML = `Words per minute (WPM): ${(characters/5)/60 - 1}`;
        accuracyDiv.innerHTML = `Accuracy: ${((characters - mistakeCounter) / characters) * 100.00}%`;
        mistakesDiv.innerHTML = `Mistakes: ${mistakeCounter}`;
        gameWin = true;
    }
});

// This function gets a random code from the arrayOfCode and breaks down the string into letters
// For each letter, a span is being created containing that letter and is appended to
// the html of the element id "words"
function detectCode() {
    let randomCode = arrayOfCode[Math.floor(Math.random() * arrayOfCode.length)];
    codeShown.innerHTML = randomCode.codeStructure;
    codeHeader.innerHTML = randomCode.codeName;
    definitionP.innerHTML = randomCode.codeDefinition;
    linkP.innerHTML = randomCode.codeLink;
    linkP.setAttribute('href', randomCode.codeLink);
    codeToType = document.getElementById("words").innerHTML;
    characters = codeToType.length;
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
    let timeDuration = setInterval(startTimer, 1000);
    document.getElementById("start").disabled = true;

    function startTimer() {
        seconds = startTime % 60;
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
            timeDuration = setInterval(gameTimer, 1000);
        }
    }

    function gameTimer() {
        let minutes = Math.floor(time/60);
        seconds = time % 60;
        if (time >= 0 && gameWin === false && gameLose === false) {
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            countDownTimer.innerHTML = `Timer: ${minutes}:${seconds}`;
            time--;
        } else if (gameWin === true || gameLose === true){
            clearInterval(timeDuration);
        } else if (countDownTimer.innerHTML === 'Timer: 0:00') {
            alert("You Failed!");
            document.getElementById("input").disabled = true;
            document.getElementById("recycle").disabled = false;
            gameLose = true;
        }
    }
}

detectCode();