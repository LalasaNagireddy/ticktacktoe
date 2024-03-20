const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const twoPlayerModeButton = document.getElementById('twoPlayerMode');
const vsComputerModeButton = document.getElementById('vsComputerMode');
const gameBoard = document.querySelector('.game-board');
const gameInfo = document.querySelector('.game-info');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let isTwoPlayerMode = true;

function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    gameStatus.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;

  if (!isTwoPlayerMode && currentPlayer === 'O') {
    computerMove();
  }
}

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === player;
    });
  });
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

function computerMove() {
  const emptyCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  if (emptyCells.length > 0) {
    const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomCellIndex] = currentPlayer;
    cells[randomCellIndex].textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
      gameStatus.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if (gameState.every(cell => cell !== '')) {
      gameStatus.textContent = 'Draw!';
      gameActive = false;
      return;
    }

    currentPlayer = 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function startGame(mode) {
  isTwoPlayerMode = mode;
  document.querySelector('.game-mode-selection').style.display = 'none';
  gameBoard.style.display = 'grid';
  gameInfo.style.display = 'block';
  restartGame();
}

twoPlayerModeButton.addEventListener('click', () => startGame(true));
vsComputerModeButton.addEventListener('click', () => startGame(false));
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
