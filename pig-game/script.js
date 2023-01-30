'use strict';

// define variables
let diceInterval;
let rollCounter = 0;
let rollScore = 0;
let isRolling = false;
let gameOn = false;
const winningScore = 50;
let playerID; // Used for choosing what player to change name on
const player1 = {
  id: 0,
  class: 'player--0',
  name: 'Player 1',
  current: 0,
  score: 0,
  lastWinner: false,
};
const player2 = {
  id: 1,
  class: 'player--1',
  name: 'Player 2',
  current: 0,
  score: 0,
  lastWinner: false,
};
let currentPlayer = player1;

// define functions
// reset game
function reset() {
  gameOn = false;
  player1.current = 0;
  player1.score = 0;
  player2.current = 0;
  player2.score = 0;
  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('.btn--new').classList.add('hidden');
  document.querySelector('.btn--roll').classList.remove('hidden');
  document.querySelector('.btn--hold').classList.add('hidden');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  currentPlayer = player1;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.modal--victory').classList.add('hidden');
  clearInterval(diceInterval);
  diceInterval = false;
  rollCounter = 0;
  isRolling = false;
}

// change name of the clicked playername
// makes modal appear
function changeName() {
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.modal--changeName').classList.remove('hidden');
  playerID = this.id;
  document.querySelector('#modal-input').focus();
}

function winnerModal() {
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.modal--victory').classList.remove('hidden');
}

function applyNameChange() {
  let textInput = document.querySelector('#modal-input');
  if (textInput.value) {
    playerID === 'name--0' ? (player1.name = textInput.value) : (player2.name = textInput.value);
    document.querySelector(`#${playerID}`).textContent = textInput.value;
    textInput.value = '';
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  }
}

// actual rolling happens here
function diceRolling() {
  let diceIcon = document.querySelector('.dice');
  rollScore = Math.trunc(Math.random() * 6) + 1;
  diceIcon.src = `dice-${rollScore}.png`;
  rollCounter++;
  let stopInt = Math.trunc(Math.random() * rollCounter);
  if (stopInt > 10) {
    clearInterval(diceInterval);
    diceInterval = false;
    rollCounter = 0;
    isRolling = false;
    addCurrentScore(rollScore);
  }
}

// dice roller
// ensures the dice will roll for a while before stopping
function rollDice() {
  if (isRolling) return;
  if (!gameOn) {
    gameOn = true;

    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.btn--new').classList.remove('hidden');
  }
  isRolling = true;
  if (!diceInterval) {
    diceInterval = setInterval(diceRolling, 100);
  }
}

// add score to current
function addCurrentScore(score) {
  if (score === 1) {
    // losing the round
    currentPlayer.current = 0;
    document.querySelector(`#current--${currentPlayer.id}`).textContent = currentPlayer.current;
    changeActivePlayer();
  } else {
    currentPlayer.current += score;
    document.querySelector('.btn--hold').classList.remove('hidden');
  }
  document.querySelector(`#current--${currentPlayer.id}`).textContent = currentPlayer.current;
}

// change player
function changeActivePlayer() {
  document.querySelector(`.player--${currentPlayer.id}`).classList.toggle('player--active');
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  document.querySelector(`.player--${currentPlayer.id}`).classList.toggle('player--active');
  document.querySelector('.btn--hold').classList.add('hidden');
}

// hold score
function holdScore() {
  if (isRolling) return;
  currentPlayer.score += currentPlayer.current;
  currentPlayer.current = 0;
  document.querySelector(`#score--${currentPlayer.id}`).textContent = currentPlayer.score;
  document.querySelector(`#current--${currentPlayer.id}`).textContent = currentPlayer.current;
  if (currentPlayer.score >= winningScore) {
    declareWinner();
    return;
  }
  changeActivePlayer();
}

function declareWinner() {
  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('.btn--roll').classList.add('hidden');
  document.querySelector('.btn--hold').classList.add('hidden');
  document.querySelector('.modal--victory').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('#winnertext').textContent = `
  Congratulations!
  ${currentPlayer.name} is the winner with ${currentPlayer.score} points!
  `;
}

// add event listeners
document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--new').addEventListener('click', reset);
document.querySelector('.btn--hold').addEventListener('click', holdScore);
document.querySelector('#name--0').addEventListener('click', changeName);
document.querySelector('#name--1').addEventListener('click', changeName);
document.querySelector('#modal-button').addEventListener('click', applyNameChange);
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') applyNameChange();
});
let closeButtons = document.querySelectorAll('.close-modal');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', function () {
    document.querySelector('.modal:not(.hidden)').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  });
}

reset(); // start the game

// TODO
/*
refactor code
consider using white on all modals - remove 'white' class
upload on code.harbosen.net/dice-game
*/
