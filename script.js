'use strict';
class Game {
  constructor(gameContainer, firstPlayerID, secondPlayerID) {
    this.container = document.querySelector(gameContainer);
    this.firstPlayer = this.container.querySelector(firstPlayerID);
    this.secondPlayer = this.container.querySelector(secondPlayerID);
    this.activePlayer = 0;
    this.maxScore = 100;
    this.currentScore = 0;
    this.playersScore = [0, 0];
    this.diceElement = this.container.querySelector('.dice');
    this.displayWinner = this.container.querySelector('.displayWinner');
    this.rollBtn = this.container.querySelector('#roll-dice');
    this.newGameBtn = this.container.querySelector('#new-game');
    this.holdBtn = this.container.querySelector('#hold');
  }
  //inite starter values
  inite = () => {
    this.container.querySelector('#player-score--0').textContent = 0;
    this.container.querySelector('#player-score--1').textContent = 0;
    this.diceElement.classList.add('hidden');
    this.displayWinner.textContent = '';
    this.activePlayer = 0;
    this.currentScore = 0;
    this.playersScore = [0, 0];
    this.rollBtn.disabled = false;
    this.holdBtn.disabled = false;
  };
  //swich player
  swichPlayer = function () {
    this.currentScore = 0;
    this.container.querySelector(
      `#player-current-scrore--${this.activePlayer}`
    ).textContent = 0;
    this.activePlayer === 0 ? (this.activePlayer = 1) : (this.activePlayer = 0);
    this.firstPlayer.classList.toggle('player--active');
    this.secondPlayer.classList.toggle('player--active');
  };
  //get and display dice value
  rollDise = () => {
    const dice = Math.trunc(Math.random() * 6 + 1);
    this.diceElement.classList.remove('hidden');
    this.diceElement.src = `dice-${dice}.png`;
    if (dice != 1) {
      this.currentScore += dice;
    } else {
      this.swichPlayer();
    }
    this.container.querySelector(
      `#player-current-scrore--${this.activePlayer}`
    ).textContent = this.currentScore;
  };
  //check Winner
  checkWinner = () => {
    if (this.playersScore[this.activePlayer] >= this.maxScore) {
      this.diceElement.classList.add('hidden');
      this.container.querySelector(
        '.displayWinner'
      ).textContent = `Player ${this.activePlayer} Win the Game!`;
      //make buttons inactive
      this.rollBtn.disabled = !this.rollBtn.disabled;
      this.holdBtn.disabled = !this.holdBtn.disabled;
    }
  };
  //hold current value to player score
  hold = () => {
    this.playersScore[this.activePlayer] += this.currentScore;
    this.container.querySelector(
      `#player-score--${this.activePlayer}`
    ).textContent = this.playersScore[this.activePlayer];
    this.checkWinner();
    this.swichPlayer();
  };
  //add Events to buttons
  events = () => {
    //event for roll-dice button
    this.rollBtn.addEventListener('click', this.rollDise);
    //event for new game button
    this.newGameBtn.addEventListener('click', this.inite);
    //event for hold button
    this.holdBtn.addEventListener('click', this.hold);
  };
}

const newGame = new Game('main', '#player--0', '#player--1');
newGame.inite();
newGame.events();
