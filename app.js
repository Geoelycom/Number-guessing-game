/*
GAME FUNCTION:
- player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again
*/

//Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game')
minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// Assign UI min and Max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mouseDown', function(e) {

    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for Guess 
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate input

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        //Game Over
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Wrong Number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            //Game over - lost

            gameOver(false, `Game Over, YOU LOST. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong

            //change border color
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';
            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }

});
// game over function to aviod repetition
function gameOver(Won, msg) {
    let color;
    Won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    //change color
    guessInput.style.borderColor = 'color';
    //set text color

    message.style.color = color;

    // set mmessage
    setMessage(msg);

    // play Again?
    guessBtn.value = 'play again';
    guessBtn.className += 'play-again';

}
//get winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

// set message Function
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}