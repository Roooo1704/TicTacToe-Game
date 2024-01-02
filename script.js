const board = document.getElementById('board');
const status = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultContent = document.getElementById('resultContent');
const resetButton = document.querySelector('.new-game-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle cell click
function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

// Function to update the game board UI
function updateBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => cellClick(index));
        board.appendChild(cellElement);
    });
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            displayResult(`Player ${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        displayResult('It\'s a tie!');
    }
}

// Function to toggle players
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to display the result screen
function displayResult(result) {
    resultContent.textContent = result;
    resultScreen.style.display = 'flex';
}

// Function to start a new game
function newGame() {
    resultScreen.style.display = 'none';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Player X\'s turn';
    updateBoard();
}

// Initial board setup
updateBoard();
