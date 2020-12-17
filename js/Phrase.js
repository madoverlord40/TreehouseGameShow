/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {

    //store the phrase passed to the constructor
    #thePhrase;
    //store the chosen letter from the user
    #chosenLetter;
    //store a list of <LI> used in the dispay html so we can easily show hide letters
    //these are created and then stored here when addPhraseToDisplay is called
    #listElements;

    constructor(init_phrase) {
        if(init_phrase != null && typeof(init_phrase) === 'string') {
            this.#thePhrase = init_phrase.toLowerCase();
            this.#chosenLetter = '';
            this.#listElements = [];
        }
    }

    getPhraseLetterCount() {
        if(this.#thePhrase != null) {
            const length = this.#thePhrase.length;
            const phrase = this.#thePhrase;
            let count = 0;

            for(var index = 0; index < length; index++) {
                if(phrase[index] != ' ') {
                    count++;
                }
            }
            return count;
        }

        return 0;
    }

    addPhraseToDisplay() {
        let div = document.getElementById('phrase');
        div.innerHTML = '';
        let ul = document.createElement('UL');
        
        div.appendChild(ul);

        const length = this.#thePhrase.length;
        const phrase = this.#thePhrase;
               
        for(var index = 0; index < length; index++) {
            let element = document.createElement('LI');
            let letter = phrase[index];
            if(letter != ' ') {
                element.className = "hide letter " + letter;                
            }
            else {
                element.className = "space";
            }

            element.textContent = letter;
            this.#listElements[index] = element;
            ul.appendChild(element);
        }

    }

    checkLetter(letter) {
        this.#chosenLetter = '';

        if(this.#thePhrase != null) {
            if(letter != null && typeof(letter) === 'string') {
                
                const length = this.#thePhrase.length;
                const phrase = this.#thePhrase;
                let result = 0;

                for(var index = 0; index < length; index++) {
                    if(phrase[index] === letter) {
                        result += 1;
                        this.#chosenLetter = letter;
                    }
                }

                return result;
            }
        }

        return 0;
    }

    showMatchedLetter() {
        const length = this.#listElements.length;

        for(var index = 0; index < length; index++) {
            const element = this.#listElements[index];
            const letter = this.#chosenLetter;
            if(element.textContent === letter) {
                element.className = "show letter " + letter; 
            }
        }
    }
    
 }