document.addEventListener('DOMContentLoaded', () => {
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const start_game = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const tries = document.getElementsByClassName('tries');
    const heart = document.getElementsByTagName("img");
    const letters = document.getElementsByClassName('letter');
    const keypad = document.querySelectorAll('button');
    console.log(letters);

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
        const words = letters.length - 1;
        for (let i = 0; i < words; i++) {

            if (letters[i].textContent === button && letters[i].classList !== "show") {
                letters[i].classList.add('show');
                //console.log(letters[i].indexOf(button));
            }
        }
        return null;
    }
    window.addEventListener('keypress', (e) => {

        for (let i = 0; i < keypad.length; i++) {

            if (e.key === keypad[i].textContent && keypad[i].disabled === false) {
                keypad[i].classList.add('chosen');
                keypad[i].disabled = true;
                break;
            }
        }
        checkLetter(e.key);
        let letterFound = checkLetter();
        if (letterFound === null && missed !== 5) {
            heart[missed].src = "images/lostHeart.png";
            missed += 1;
            console.log(missed);
        }
        //missed = missed + 1;
    })

    const show = document.getElementsByClassName('show');
    function checkWin() {
        if (show.length === letters.length) {
            overlay.style.display = "block";
            overlay.classList.remove('start');
            overlay.classList.add('win');
        }
        else if (missed === 4) {
            overlay.style.display = "block";
            overlay.classList.remove('start');
            overlay.classList.add('lose');
        }
    }
    checkWin();
    console.log(missed);
});