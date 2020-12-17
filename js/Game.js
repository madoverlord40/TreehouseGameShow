/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js 
 * Author James Hanley
 * */

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

    //Gets a random phrase from the prases list, and returns it
    #getRandomPhrase() {
        //create a random index, from 0 to length
        var random = Math.floor(Math.random() * this.#phrases.length);
        //store the chosen phrase
        var phrase = this.#phrases[random];
        //return the phrase
        return phrase;
    }

    //handle the button interaction, from the keyboard
    handleInteraction(selectedButton) {
        if(selectedButton != null) {
            //get the chosen letter from the selected button
            this.#userChosenLetter = selectedButton.textContent;
            //disable it, so we cant chose it again
            selectedButton.disabled = true;
            
            //lets see if we chose a letter that is in the chosen phrase
            let isCorrect = this.#activePhrase.checkLetter(this.#userChosenLetter);
            //update the buttons styling based on correct answer, true if greater than 0
            selectedButton.className = (isCorrect > 0 ? "chosen" : "wrong");

            if(isCorrect > 0) {
                //increment correct answers
                this.#correctAnswers += isCorrect;

                //show the matched letter
                this.#activePhrase.showMatchedLetter();
                //see if we won
                this.checkForWin();
            }
            else {
                //we got it wrong, remove a life
                this.removeLife();
                //increment misses
                this.#missed += 1;
                //if we miss 5, the game is over
                if(this.#missed === 5) {
                    this.gameOver(false);
                }
            }
        }
    }

    //removes a life from the game by changing its innerHTML
    removeLife() {
        let scoreboard = document.getElementById('scoreboard');
        let ol = scoreboard.childNodes[1];

        //we need to get the elements from right to left, so start at the max and go backwards as we get misses
        const removeElement = (5 - this.#missed) - 1;
        //get a list of life elements, they use the 'tries' class
        let tries = ol.getElementsByClassName('tries');
        //update the innerHTML so that it uses the lostheart.png
        tries[removeElement].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">`;
    }

    //evaluate if the player has won the game yet, if so, call game over
    checkForWin() {
        //gets the number of letters, excluding spaces
        let count = this.#activePhrase.getPhraseLetterCount();     
        //as long as we have not lost the game, and we have the correct answer count
        let won = (this.#missed < 5 && this.#correctAnswers === count);
            
        if(won) {
            this.gameOver(true);
        }
    }

    //private function to reset the keyboard, called when the game is over
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
    //private function to reset the hearts, called when the game is over
    #resetLives() {
        let scoreboard = document.getElementById('scoreboard');
        let ol = scoreboard.childNodes[1];

        let tries = ol.getElementsByClassName('tries');

        for(var index = 0; index < tries.length; index++) {
            tries[index].innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">`;
        }
    }

    //function gameOver
    //@Param winner: boolean
    gameOver(winner) {
        //show the overlay, and update the class and style based on winner
        this.#startOverlay.className = (winner ? "win" : "lose");
        this.#startOverlay.style.display = 'block';

        //reset the keyboard
        this.#resetKeyboard();

        //reset life
        this.#resetLives();
    }
 }