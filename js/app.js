document.addEventListener('DOMContentLoaded', () => {
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const start_game = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const tries = document.getElementsByClassName('tries');
    const heart = document.getElementsByTagName("img");
    const letters = document.getElementsByClassName('letter');
    const keypad = document.querySelectorAll('button');


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
        let contains = 0;
        const words = letters.length;
        console.log(contains);
        // if (letters.indexOf(button) > -1) {
        //     contains++;
        //     console.log('worked');
        // }
        // for (i = 0; i < phraseArray.length; i++) {
        //     console.log('started');
        //     if (phraseArray[i].indexOf(button) > -1) {
        //         contains++;
        //         console.log('worked');
        //     }
        //     else if (phraseArray[i].indexOf(button) === -1) {
        //         console.log('error');
        //     }
        // }

        for (let i = 0; i < words; i++) {
            if (letters[i].textContent === button) {
                console.log(letters[i].textContent);
                letters[i].classList.add('show');
                contains++;
                //console.log(letters[i].indexOf(button));
                //find letters that match the button pressed and then add show
                //why does i work in time machine but not e?
            }
        }
        if (contains === 0) {
            return null;
        }

    }
    qwerty.addEventListener('click', (e) => {//listen to qwerty
        if (e.target.tagName === "BUTTON") {
            console.log(e.target.textContent);
            let button = e.target;
            for (let i = 0; i < keypad.length; i++) {

                if (button.textContent === keypad[i].textContent && keypad[i].disabled === false) {
                    keypad[i].classList.add('chosen');
                    keypad[i].disabled = true;
                    break;
                }
            }
            let letterFound = checkLetter(button.textContent);
            console.log(letterFound);
            if (letterFound === null && missed !== 5) {
                heart[missed].src = "images/lostHeart.png";
                missed += 1;
                console.log(missed);
            }
        }
        checkWin();
    })
    window.addEventListener('keypress', (e) => {

        for (let i = 0; i < keypad.length; i++) {

            if (e.key === keypad[i].textContent && keypad[i].disabled === false) {
                keypad[i].classList.add('chosen');
                keypad[i].disabled = true;
                break;
            }
        }
        let letterFound = checkLetter(e.key);
        console.log(letterFound);
        if (letterFound === null && missed !== 5) {//and if the keypad is disabled.
            heart[missed].src = "images/lostHeart.png";
            missed += 1;
            console.log(missed);
        }
        //missed = missed + 1;
        checkWin();
    });


    function checkWin() {
        const show = document.getElementsByClassName('show');
        console.log(show.length);
        console.log(letters.length);
        if (show.length === letters.length) {
            overlay.style.display = "block";
            overlay.classList.remove('start');
            overlay.classList.add('win');
            start_game.classList.add('win');
            const congrats = document.createElement('h2');
            congrats.textContent = "Congrats, You Won!"
            overlay.appendChild(congrats);
        }
        else if (missed > 4) {
            overlay.style.display = "block";
            overlay.classList.remove('start');
            overlay.classList.add('lose');
            start_game.classList.add('lose')
            const sorry = document.createElement('h2');
            sorry.textContent = "Sorry, you lost. Try again!"
            overlay.appendChild(sorry);
        }
    }
});