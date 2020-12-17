/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let newGameObject = {};

//reference to the reset button
let resetBtn = document.getElementById('btn__reset');
//add click handler
resetBtn.onclick = (event) => {
    if(event.target != null) {
        newGameObject = new Game();

        newGameObject.startGame();
    }
}

let keyboardDiv = document.getElementById('qwerty');

keyboardDiv.addEventListener('click', (event ) => {
    if(event.target != null && event.target.nodeName === 'BUTTON') {
        let button = event.target;

        newGameObject.handleInteraction(button);
    }
})