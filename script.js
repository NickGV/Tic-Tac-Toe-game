const squares = document.querySelectorAll(".square");
const turn = document.getElementById("turn");
const winMessage = document.getElementById("win-message");
const resetBtn = document.getElementById("reset-button");

let currentplayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameEnd = false;

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (!gameEnd) {
      const index = Array.from(square.parentNode.children).indexOf(square);
      if (gameBoard[index] == "") {
        gameBoard[index] = currentplayer;
        markSquare(square);
        if (checkWinner()) {
          winMessage.textContent = `El jugador ${(currentplayer = "X"
            ? "1"
            : "2")} ha ganado!`;
          winMessage.style.color = `${(currentplayer = "X"
            ? "yellow"
            : "red")}`;
          resetBtn.style.display = "block";
          gameEnd = true;
        } else if (gameBoard.every((square) => square !== "")) {
          winMessage.textContent = "Es un empate!";
          winMessage.style.color = "rgb(39, 39, 163)";
          resetBtn.style.display = "block";
          gameEnd = true;
        } else {
          currentplayer = currentplayer === "X" ? "O" : "X";
          updateTurnDisplay();
        }
      }
    }
  });
});

const markSquare = (square) => {
  square.querySelector("span").innerHTML = currentplayer;
};

const updateTurnDisplay = () => {
  if (currentplayer == "X") turn.textContent = "1";
  if (currentplayer == "O") turn.textContent = "2";
};

const checkWinner = () => {
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i * 3] == currentplayer &&
      gameBoard[i * 3 + 1] == currentplayer &&
      gameBoard[i * 3 + 2] == currentplayer
    ) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i] == currentplayer &&
      gameBoard[i + 3] == currentplayer &&
      gameBoard[i + 6] == currentplayer
    ) {
      return true;
    }
  }

  if (
    (gameBoard[0] == currentplayer &&
      gameBoard[4] == currentplayer &&
      gameBoard[8] == currentplayer) ||
    (gameBoard[2] == currentplayer &&
      gameBoard[4] == currentplayer &&
      gameBoard[6] == currentplayer)
  ) {
    return true;
  }

  return false;
};
