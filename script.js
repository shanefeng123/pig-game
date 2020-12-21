'use strict';

// let score0El = document.querySelector('#score--0');
// let current0El = document.querySelector('#current--0');
// let score1El = document.querySelector('#score--1');
// let current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let dice;
const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const reset = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  diceEl.classList.add('hidden');
};

reset();

const rollDice = function () {
  dice = Math.trunc(Math.random() * 6) + 1;
};

btnNew.addEventListener('click', reset);

btnRoll.addEventListener('click', function () {
  if (playing) {
    rollDice();
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = !playing;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      currentScore = 0;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});
