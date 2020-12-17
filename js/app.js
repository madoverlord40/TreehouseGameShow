/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 * Author James Hanley
 */

// empry game object
let newGameObject = {};

//reference to the reset button
let resetBtn = document.getElementById('btn__reset');
//add click handler
resetBtn.onclick = (event) => {
    if(event.target != null) {
        //create new instance of game object class
        newGameObject = new Game();
        //start the game!
        newGameObject.startGame();
    }
}
//get the keyboard div
let keyboardDiv = document.getElementById('qwerty');

//create listener for the div, and if its a button, pas it to the handle interaaction
keyboardDiv.addEventListener('click', (event ) => {
    if(event.target != null && event.target.nodeName === 'BUTTON') {
        let button = event.target;

        newGameObject.handleInteraction(button);
    }
})