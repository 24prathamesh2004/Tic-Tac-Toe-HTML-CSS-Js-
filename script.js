let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let plays = 0;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id] && plays < 9) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${ currentPlayer } has won!`;
            playerText.style.color = '#00ff00';
            let winning_blocks = playerHasWon();
            plays = 10;

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            winning_blocks.forEach(box => boxes[box].style.color = '#00ff00');

            return;
        }
        plays++;
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }

    if(plays === 9){
        playerText.innerHTML = `Game Drawn!`;
        playerText.style.color = '#ff2c2c';
        boxes.forEach(box => box.style.color = '#ff2c2c');
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    plays = 0;
    playerText.style.color = '#f2c14e';
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.color = '#f2c14e';
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame();