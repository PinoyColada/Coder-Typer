const codeShown = document.getElementById("words");
const codeEntered = document.getElementById("input");
let arrayOfCode = [
    "const array1 = [5, 12, 8, 130, 44]; const isLargeNumber = (element) => element > 13; console.log(array1.findIndex(isLargeNumber)); ",
    "let > = greater than >"
]

codeEntered.addEventListener('input', () => {
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
        } else if (letter === ">" || letter === "<"){
            if (letter === letterSpan.innerText){
                letterSpan.classList.add('right');
                letterSpan.classList.remove('wrong');
            } else {
                letterSpan.classList.add('wrong');
                letterSpan.classList.remove('right');
            }
        } else {
            letterSpan.classList.add('wrong');
            letterSpan.classList.remove('right');
        }
    })
});

// This function gets a code from the arrayOfCode and breaks down the string into letters
// For each letter, a span is being created containing that letter and is appended to
// the html of the element id "words"
function detectCode() {
    document.getElementById("words").innerHTML = arrayOfCode[1];
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

detectCode();