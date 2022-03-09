const codeShown = document.getElementById("words");
const codeEntered = document.getElementById("input");
let arrayOfCode = [
    "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber)); "
]

codeEntered.addEventListener('input', () => {
    const arrayCode = codeShown.querySelectorAll('span');
    const arraySplit = codeEntered.value.split('');
    arrayCode.forEach((letterSpace, index) => {
        const letter = arraySplit[index];
        if (letter === letterSpace.innerHTML) {
            letterSpace.classList.add('right');
            letterSpace.classList.remove('wrong');
        } else if (letter == null){
            letterSpace.classList.remove('right');
            letterSpace.classList.remove('wrong');
        } else {
            letterSpace.classList.add('wrong');
            letterSpace.classList.remove('right');
        }
    })
});

// This function gets a code from the arrayOfCode and breaks down the string into letters
// For each letter, a span is being created containing that letter and is appended to
// the html of the element id "words"
function detectCode() {
    document.getElementById("words").innerHTML = arrayOfCode[0];
    const codeToType = document.getElementById("words").innerHTML;
    codeShown.innerHTML = '';
    codeToType.split('').forEach(letter => {
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

detectCode();