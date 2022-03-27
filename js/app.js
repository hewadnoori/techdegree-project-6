const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase'); console.log(phrase);
const start_game = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

let missed = 0; //if player guesses wrong five times, they lose
//starts the game by removing the overlay
start_game.addEventListener("click", () => {
    overlay.style.display = "none";
});
//words that the player must guess
const phrases = [
    'humble dumble',
    'salad dressing',
    'time machine',
    'code camp',
    'nymph goddess',
]
//random number generator
function random(max = 5) {
    return Math.floor(Math.random() * max);
}

function getRandomPhraseAsArray(arr) {
    let phrase = arr[random()];
    phrase = phrase.split(' '); //becomes array of letters
    for (let i = 0; i < phrase.length; i++) {
        phrase[i] = phrase[i].split('');
    }
    console.log(phrase);

    return phrase;
}
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        for (let i = 0; i < word.length; i++) {
            const li = document.createElement('li');
            li.textContent = word[i];
            phrase.appendChild(li);
            if (li.textContent !== " ") {
                li.classList.add('letter');
            }
        }
        const space = document.createElement('p');
        space.textContent = '';
        phrase.appendChild(space);
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
function checkLetter(button) {

}