/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach winner score entered by user points on GLOBAL score wins the game
- If both dices roll to 6 it's next player trun.

TODO
- implement lost score. 

*/

// global variables
let scores, roundScore, activePlayer, winningScore;

// selector variables
let dice1Selector = document.querySelector('.dice1');
let dice2Selector = document.querySelector('.dice2');
let score1Selector = document.getElementById('score-0');
let score2Selector = document.getElementById('score-1');
let current1Selector = document.getElementById('current-0');
let current2Selector = document.getElementById('current-1');
let rollBtnSelector = document.querySelector('.btn-roll');
let newBtnSelector = document.querySelector('.btn-new');
let holdBtnSelector = document.querySelector('.btn-hold');
let player1Selector = document.querySelector('.player-0-panel');
let player2Selector = document.querySelector('.player-1-panel');
let winScoreSelector = document.getElementById('winScore');
let startSelector = document.querySelector('.start-game');
let startBtnSelector = document.querySelector('.btn-start');
let wrapperSelector = document.querySelector('.wrapper');

init();

// start game after entering winning score
startBtnSelector.addEventListener('click', function() {
    winningScore = winScoreSelector.value;
    startSelector.style.display = 'none';
    wrapperSelector.style.display = 'block';
    document.querySelector('.score').textContent = 'Winning Score is ' + winningScore;
});

// button roll event
rollBtnSelector.addEventListener('click', function(){
    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    dice1Selector.style.display = 'block';
    dice1Selector.src = 'dice-' + dice1 + '.png';
    dice2Selector.style.display = 'block';
    dice2Selector.src = 'dice-' + dice2 + '.png';
    console.log(`Player: ${activePlayer + 1}\tDice 1: ${dice1}\tDice 2: ${dice2}`);
    // 3. Update the round score IF the rolled number was not a 1    
    if((dice1 !==1 && dice2 !== 1) && (dice1 !== 6 && dice2 !== 6)) {
            // add score to current
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        
    } else {
        // reset it to zero and shift the turn
        resetAndChangePlayer();
    }
});

// hold button event
holdBtnSelector.addEventListener('click', function(){
    // updates the score in global
    scores[activePlayer] += roundScore;

    // update the ui 
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // winner
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        dice1Selector.style.display = 'none';
        dice2Selector.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        rollBtnSelector.style.display = 'none';
        holdBtnSelector.style.display = 'none';
    } else {
        // turn to next player
        resetAndChangePlayer();
    }
});

newBtnSelector.addEventListener('click', init);

function resetAndChangePlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    player1Selector.classList.toggle('active');
    player2Selector.classList.toggle('active');
    dice1Selector.style.display = 'none';
    dice2Selector.style.display = 'none';
}

function init() {

    dice1Selector.style.display = 'none';
    dice2Selector.style.display = 'none';
    score1Selector.textContent = 0;
    score2Selector.textContent = 0;
    current1Selector.textContent = 0;
    current2Selector.textContent = 0;
    player1Selector.classList.add('active');
    player1Selector.classList.remove('winner');
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    player2Selector.classList.remove('active');
    player2Selector.classList.remove('winner');
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    rollBtnSelector.style.display = 'block';
    holdBtnSelector.style.display = 'block';
    startSelector.style.display = 'block';
    wrapperSelector.style.display = 'none';

    // initializing global variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 0;
}