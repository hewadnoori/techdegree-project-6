document.addEventListener('DOMContentLoaded', () => {
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const start_game = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const tries = document.getElementsByClassName('tries');
    const heart = document.getElementsByTagName("img");
    const letters = document.getElementsByClassName('letter');
    const keypad = document.querySelectorAll('button');
    const ul = document.querySelector("ul");

    let keyDis = [];
    let missed = 0;
    start_game.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    const phrases = [
        'humble dumble',
        'salad dressing',
        'time machine',
        'code camp',
        'nymph goddess',
    ]

    function random(max = 5) {
        return Math.floor(Math.random() * max);
    }

    function getRandomPhraseAsArray(arr) {
        let phrase = arr[random()];
        phrase = phrase.split('');
        return phrase;
    }
    function addPhraseToDisplay(arr) {
        for (let i = 0; i < arr.length; i++) {
            const word = arr[i];

            for (let i = 0; i < word.length; i++) {
                const li = document.createElement('li');
                li.textContent = word[i];

                ul.insertAdjacentElement("beforeend", li);
                if (li.textContent !== " ") {
                    li.classList.add('letter');
                }
                else if (li.textContent === " ") {
                    li.classList.add('space');
                }
            }

        }

    }
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    function checkLetter(button) {
        let contains = 0;
        const words = letters.length;
        let letterClass;

        for (let i = 0; i < words; i++) {
            if (letters[i].textContent === button) {
                letters[i].classList.add('show');
                contains++;
                letterClass = letters[i].classList.value;
            }
        }
        if (contains === 0) {
            return null;
        }

    }
    qwerty.addEventListener('click', (e) => {
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
            if (letterFound === null && missed !== 5 && keyDis.includes(e.target.textContent) === false) {
                heart[missed].src = "images/lostHeart.png";
                missed += 1;
                keyDis.push(e.target.textContent);
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
        if (letterFound === null && missed !== 5 && keyDis.includes(e.key) === false) {
            heart[missed].src = "images/lostHeart.png";
            missed += 1;
            keyDis.push(e.key);
        }

        checkWin();
    });


    function checkWin() {
        const show = document.getElementsByClassName('show');
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