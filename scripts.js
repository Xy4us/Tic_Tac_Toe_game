// const btn = document.querySelector(".btn");

// btn.onmousemove = function (e) {
//   let x = e.pageX - btn.offsetLeft;
//   let y = e.pageY - btn.offsetTop;
//   btn.style.setProperty("--x", x + "px");
//   btn.style.setProperty("--y", y + "px");
// };

const newGameButton = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//initialize a game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //ui par empty karwao
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  newGameButton.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap turns
    swapTurn();
    //check if anyone won?
    checkWinner();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWinner() {
  let winner = "";
  winningPositions.forEach((position) => {
    //all three boz=xes are non empty and should be exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") {
        winner = "X";
      } else {
        winner = "O";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know who is winner X or O
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //display the new  game button
  if (winner !== "") {
    newGameButton.classList.add("active");
    gameInfo.innerText = `Winner Player - ${winner}`;
    return;
  }

  //let's check weather the game is tied or not?
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  //board is filled, game is Tie
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameButton.classList.add("active");
  }
}

newGameButton.addEventListener("click", initGame);
