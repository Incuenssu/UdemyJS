'use strict';
//Selecting elements
const score0Element = document.querySelector('#score--0');
const current0Element = document.querySelector('#current--0');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const current1Element = document.querySelector('#current--1');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(
        `current--${activePlayer}`
    ).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};
/*let currentScore = 0;         Hidden by changed last button exercise, in my exercise it is neeeded
let scores = [0, 0];
let activePlayer = 0;*/
/*let playing = true;       
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');*/

//Initial conditions
let playing, currentScore, scores, activePlayer;

const init = function () {
    playing = true;
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
};
init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        //3. Check for rolled 1: if true, switch to next player. If false, add to current score
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            switchPlayer();
        }
    } //If playing is false, nothing occur
});
btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //2. Check if player's score is 100 or more
        //finish the game
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceElement.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            //switch the next player
            switchPlayer();
        }
    } //If playing is false, nothing occur
});
//BY ME
/*
btnNew.addEventListener('click', function () {
    document.querySelector(`.player--0`).classList.remove('player--winner');    // YES
    document.querySelector(`.player--1`).classList.remove('player--winner');    // YES
    document.querySelector(`.player--0`).classList.add('player--active');       // YES
    document.querySelector(`.player--1`).classList.remove('player--active');    // YES
    playing = true;
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    score0Element.textContent = 0;                                              // YES
    current0Element.textContent = 0;                                            // YES
    score1Element.textContent = 0;                                              // YES
    current1Element.textContent = 0;                                            // YES
    diceElement.classList.add('hidden');
});
*/
//BY PROFESSOR
btnNew.addEventListener('click', init);
