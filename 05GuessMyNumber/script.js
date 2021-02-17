'use strict';

/*
console.log(document.querySelector('.message').textContent);
//Changing the message of the HTML
document.querySelector('.message').textContent = 'Correct Number!';

//Changing values in HTML
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

//CLICK EVENTS
/*
//Stablish random number. It is outside of the listener button because we want calculate the random number once.
let secretnumber = Math.trunc(Math.random() * 20) + 1;
//Creating a variable for the score decrease
let score = 20;
//Creating a variable for the highscore
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    //console.log(guess, typeof guess);

    //Si pinchamos en Check sin dar un numero, obtendremos un 0, que es un valor falso, por eso se pone este if.
    if (!guess) {
        document.querySelector('.message').textContent = '⛔️ No Number!';
    }
    //Added the logic of the game
    else if (guess === secretnumber) {
        document.querySelector('.message').textContent = '👍 Correct Number!';
        document.querySelector('.number').textContent = secretnumber;
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        //Manipulate the CSS style
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
    } else if (guess > secretnumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = '📈 Too high!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent =
                '😢 You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    } else if (guess < secretnumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = '📉 Too low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent =
                '😢 You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    }
});

//CHALLENGE 1
document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretnumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.message').textContent = 'Start guessing..';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});*/

//REFACTORING CODE
let secretnumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
//Creating a function for repetable message changed
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        displayMessage('⛔️ No Number!');
    } else if (guess === secretnumber) {
        displayMessage('👍 Correct Number!');
        document.querySelector('.number').textContent = secretnumber;
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        //Refactoring
    } else if (guess !== secretnumber) {
        if (score > 1) {
            displayMessage(
                guess > secretnumber ? '📈 Too high!' : '📉 Too low!'
            );
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('😢 You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }
});
document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretnumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});
