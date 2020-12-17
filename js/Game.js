/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

    //scoring, how many times has the user chosen incorrectly
    #missed;
    //the randomly selected phrase for this game session
    #activePhrase;
    //the phrases this game will randomize from
    #phrases;        
    //holds the selected letter from the user, used when checking for win
    #userChosenLetter;
    //the start screen overlay
    #startOverlay;
    //keep track of correct number of choices, when this is equal to the length of the phrase, game win
    #correctAnswers;

    constructor() {
        
        this.#phrases = ['love everyone', 'fun times', 'game time', 'party on', 'to victory'];  
        this.#startOverlay = document.getElementById('overlay');
    }

    startGame() {
        //reset correct answers
        this.#correctAnswers = 0;
        //reset the number missed
        this.#missed = 0;
        //reset the user chosen letters
        this.#userChosenLetter = '';
        //chose a new random phrase
        var phrase = this.#getRandomPhrase();
        //create a new phrase object
        this.#activePhrase = new Phrase(phrase);
        //hide overlay
        this.#startOverlay.style.display = 'none'; 

        this.#activePhrase.addPhraseToDisplay();
    }

    #getRandomPhrase() {
        //create a random index, from 0 to length
        var random = Math.floor(Math.random() * this.#phrases.length);
        //store the chosen phrase
        var phrase = this.#phrases[random];
        //return the phrase
        return phrase;
    }

    handleInteraction(selectedButton) {
        if(selectedButton != null) {
            this.#userChosenLetter = selectedButton.textContent;
            selectedButton.disabled = true;
            
            let isCorrect = this.#activePhrase.checkLetter(this.#userChosenLetter);
            selectedButton.className = (isCorrect ? "chosen" : "wrong");

            if(isCorrect > 0) {
                //increment correct answers
                this.#correctAnswers += isCorrect;

                //show the matched letter
                this.#activePhrase.showMatchedLetter();
                //see if we won
                this.checkForWin();
            }
            else {
                this.removeLife();
                this.#missed += 1;

                if(this.#missed === 5) {
                    this.gameOver(false);
                }
            }
        }
    }

    removeLife() {
        let scoreboard = document.getElementById('scoreboard');
        let ol = scoreboard.childNodes[1];

        const removeElement = (5 - this.#missed) - 1;

        let tries = ol.getElementsByClassName('tries');

        tries[removeElement].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">`;
    }

    checkForWin() {
        let count = this.#activePhrase.getPhraseLetterCount();     

        let won = (this.#missed < 5 && this.#correctAnswers === count);
            
        if(won) {
            this.gameOver(true);
        }
    }

    #resetKeyboard() {
        const chosenButtons = keyboardDiv.querySelectorAll('.chosen');
        const wrongButtons = keyboardDiv.querySelectorAll('.wrong');

        for(var index = 0; index < chosenButtons.length; index++) {
            let button = chosenButtons[index];
            button.className = 'key'
            button.disabled = false;
        }

        for(var index = 0; index < wrongButtons.length; index++) {
            let button = wrongButtons[index];
            button.className = 'key'
            button.disabled = false;
        }
    }

    #resetLives() {
        let scoreboard = document.getElementById('scoreboard');
        let ol = scoreboard.childNodes[1];

        let tries = ol.getElementsByClassName('tries');

        for(var index = 0; index < tries.length; index++) {
            tries[index].innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">`;
        }
    }

    gameOver(winner) {
                
        this.#startOverlay.className = (winner ? "win" : "lose");
        this.#startOverlay.style.display = 'block';

        //reset the keyboard
        this.#resetKeyboard();

        //reset life
        this.#resetLives();
    }
 }