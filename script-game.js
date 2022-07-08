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
    codeStructure:
      "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber));",
    codeDefinition:
      "The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
  },
  {
    codeName: "copyWithin()",
    codeStructure:
      "const array1 = ['a', 'b', 'c', 'd', 'e']; console.log(array1.copyWithin(0, 3, 4)); console.log(array1.copyWithin(1, 3));",
    codeDefinition:
      "The copyWithin() method shallow copies part of an array to another location in the same array and returns it without modifying its length.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
  },
  {
    codeName: "every()",
    codeStructure:
      "const isBelowThreshold = (currentValue) => currentValue < 40; const array1 = [1, 30, 39, 29, 10, 13]; console.log(array1.every(isBelowThreshold));",
    codeDefinition:
      "The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
  },
  {
    codeName: "includes()",
    codeStructure:
      "const array1 = [1, 2, 3]; console.log(array1.includes(2)); const pets = ['cat', 'dog', 'bat']; console.log(pets.includes('cat'));",
    codeDefinition:
      "The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
  },
  {
    codeName: "flat()",
    codeStructure:
      "const arr1 = [0, 1, 2, [3, 4]]; console.log(arr1.flat()); const arr2 = [0, 1, 2, [[[3, 4]]]]; console.log(arr2.flat(2));",
    codeDefinition:
      "The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
  },
  {
    codeName: "map()",
    codeStructure:
      "const array1 = [1, 4, 9, 16]; const map1 = array1.map(x => x * 2); console.log(map1);",
    codeDefinition:
      "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
  },
  {
    codeName: "keys()",
    codeStructure:
      "const array1 = ['a', 'b', 'c']; const iterator = array1.keys(); for (const key of iterator) { console.log(key) };",
    codeDefinition:
      "The keys() method returns a new Array Iterator object that contains the keys for each index in the array.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys",
  },
  {
    codeName: "entries()",
    codeStructure:
      "const array1 = ['a', 'b', 'c']; const iterator1 = array1.entries(); console.log(iterator1.next().value); console.log(iterator1.next().value);",
    codeDefinition:
      "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries",
  },
  {
    codeName: "some()",
    codeStructure:
      "const array = [1, 2, 3, 4, 5]; const even = (element) => element % 2 === 0; console.log(array.some(even));",
    codeDefinition:
      "The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array," +
      " it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
  },
  {
    codeName: "unshift()",
    codeStructure:
      "const array1 = [1, 2, 3]; console.log(array1.unshift(4, 5)); console.log(array1);",
    codeDefinition:
      "The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
  },
  {
    codeName: "reduceRight()",
    codeStructure:
      "const array1 = [[0, 1], [2, 3], [4, 5]]; const result = array1.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));",
    codeDefinition:
      "The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.",
    codeLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight",
  },
];

landingBtn.addEventListener("click", function () {
  document.location.href = "index.html";
});

recycleBtn.addEventListener("click", () => {
  countDownTimer.innerHTML = "";
  document.getElementById("input").disabled = true;
  document.getElementById("start").disabled = false;
  wpmDiv.innerHTML = ``;
  accuracyDiv.innerHTML = ``;
  mistakesDiv.innerHTML = ``;
  detectCode();
});

startBtn.addEventListener("click", () => {
  document.getElementById("recycle").disabled = true;
  time = 60;
  startTime = 5;
  gameWin = false;
  gameLose = false;
  mistakeCounter = 0;
  gameStart();
});

codeEntered.addEventListener("input", () => {
  let win = true;
  const arrayCode = codeShown.querySelectorAll("span");
  const arraySplit = codeEntered.value.split("");
  arrayCode.forEach((letterSpan, index) => {
    const letter = arraySplit[index];
    if (letter === letterSpan.innerHTML) {
      letterSpan.classList.add("right");
      letterSpan.classList.remove("wrong");
    } else if (letter == null) {
      letterSpan.classList.remove("right");
      letterSpan.classList.remove("wrong");
      win = false;
    } else if (letter === ">" || letter === "<") {
      if (letter === letterSpan.innerText) {
        letterSpan.classList.add("right");
        letterSpan.classList.remove("wrong");
      } else {
        letterSpan.classList.add("wrong");
        letterSpan.classList.remove("right");
        win = false;
        mistakeCounter++;
      }
    } else {
      if (letterSpan.innerHTML === " ") {
        letterSpan.classList.add("right");
        letterSpan.classList.remove("wrong");
      } else {
        letterSpan.classList.add("wrong");
        letterSpan.classList.remove("right");
        win = false;
        mistakeCounter++;
      }
    }
  });
  if (win) {
    alert("You completed the game succesfully!");
    document.getElementById("input").disabled = true;
    document.getElementById("recycle").disabled = false;
    wpmDiv.innerHTML = `Words per minute (WPM): ${characters / 5 / 1}`;
    accuracyDiv.innerHTML = `Accuracy: ${
      Math.round((characters - mistakeCounter) / characters) * 100.0
    }%`;
    mistakesDiv.innerHTML = `Mistakes: ${mistakeCounter}`;
    gameWin = true;
  }
});

// This function gets a random code from the arrayOfCode and breaks down the codeStructure property into letters
// It gets all the properties of it and displays it for the user as well
// For each letter, a span is being created containing that letter and is appended to the html of the element id "words"
// When it detects a ";" character, it creates a br element so the span generates on next line
function detectCode() {
  let randomCode = arrayOfCode[Math.floor(Math.random() * arrayOfCode.length)];
  codeShown.innerHTML = randomCode.codeStructure;
  codeHeader.innerHTML = randomCode.codeName;
  definitionP.innerHTML = randomCode.codeDefinition;
  linkP.innerHTML = randomCode.codeLink;
  linkP.setAttribute("href", randomCode.codeLink);
  codeToType = document.getElementById("words").innerHTML;
  characters = codeToType.length;
  codeShown.innerHTML = "";
  codeToType
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .split("")
    .forEach((letter) => {
      if (letter === ";") {
        const letterSpan = document.createElement("span");
        const breakSpan = document.createElement("br");
        letterSpan.innerHTML = letter;
        codeShown.appendChild(letterSpan);
        codeShown.appendChild(breakSpan);
      } else {
        const letterSpan = document.createElement("span");
        letterSpan.innerHTML = letter;
        codeShown.appendChild(letterSpan);
      }
    });
  codeEntered.value = null;
}

// creates a starting timer and disables the start button
function gameStart() {
  let timeDuration = setInterval(startTimer, 1000);
  document.getElementById("start").disabled = true;

  // counts down the starting time and changes to game timer once it reaches 0
  function startTimer() {
    seconds = startTime % 60;
    if (startTime >= 0 && gameWin === false && gameLose === false) {
      seconds = "0" + seconds;
      countDownTimer.innerHTML = `Game Starting in: ${seconds}`;
      startTime--;
    } else if (countDownTimer.innerHTML === "Game Starting in: 00") {
      clearInterval(timeDuration);
      countDownTimer.innerHTML = "";
      document.getElementById("input").disabled = false;
      timeDuration = setInterval(gameTimer, 1000);
    }
  }

  // counts down the main game time and will stop once the game is completed succesfully or if time runs out
  function gameTimer() {
    let minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (time >= 0 && gameWin === false && gameLose === false) {
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      countDownTimer.innerHTML = `Timer: ${minutes}:${seconds}`;
      time--;
    } else if (gameWin === true || gameLose === true) {
      clearInterval(timeDuration);
    } else if (countDownTimer.innerHTML === "Timer: 0:00") {
      alert("You Failed!");
      document.getElementById("input").disabled = true;
      document.getElementById("recycle").disabled = false;
      gameLose = true;
    }
  }
}

detectCode();
