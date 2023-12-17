const cells = document.querySelectorAll(".cell");
const statusTexT = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartGame");
var playerOne = prompt('enter player name! player1');
var playerTwo = prompt('enter your name!player2')
let windConditions = [
  [0, 1, 2],

  [3, 4, 5],

  [6, 7, 8],

  [0, 3, 6],

  [1, 4, 7],

  [2, 5, 8],

  [0, 4, 8],

  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let roundWon = false;
let currentPlayer = `${playerOne}`;
let running = false;
initializedGame();
function initializedGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });
  restartButton.addEventListener("click", restartGame);
  statusTexT.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  this.style.color ="red";
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == `${playerOne}` ? `${playerTwo}` : `${playerOne}`;
  statusTexT.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let roundWon = false;
  for (let index = 0; index < windConditions.length; index++) {
    const condition = windConditions[index];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        break;
    }

  }
  if (roundWon) {
    statusTexT.classList.add('winner')
    statusTexT.textContent = `${currentPlayer} won!`;
    running = false;
  } else if (!options.includes("")) {
    statusTexT.textContent = "draw";
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "Rikesh";
  options = ["", "", "", "", "", "", "", "", ""];
  statusTexT.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
 
  running = true;
}
