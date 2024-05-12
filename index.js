const gridContainer = document.getElementById("container");
let curPlayer = "player1";

let player1Win = 0;
let player2Win = 0;

let myArray = Array.from({ length: 6 }, () => Array(7).fill(-1));

function makeGrid(row, cols) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.id = j.toString() + i.toString();
      gridContainer.appendChild(cell);
      cell.addEventListener("click", function () {
        placeDisk(cell, row);
        let result = checkWin(row, cols);

        if (result.win) {
          if (result.player == 0) player1Win++;
          else player2Win++;
          updateWinsDisplay();
          const winButton = document.getElementById("win-button");
          winButton.style.visibility = "visible";
          let winner = document.querySelector(".winner");

          if (result.player == 0) {
            winner.textContent = "Player1 Wins";
            winner.style.color = getComputedStyle(
              document.documentElement
            ).getPropertyValue("--player1-disk");
          } else {
            winner.textContent = "Player2 Wins";
            winner.style.color = getComputedStyle(
              document.documentElement
            ).getPropertyValue("--player2");
          }

          winButton.addEventListener("click", function () {
            resetGame(row, cols);
            winButton.style.visibility = "hidden";
          });
        }
      });

      let disk = document.createElement("div");
      disk.className = "disk";
      cell.appendChild(disk);
    }
  }
}

function placeDisk(cell, row) {
  let cellColumn = parseInt(cell.id[0]);
  if (myArray[0][cellColumn] > -1) return false;
  let i = row - 1;
  for (; i >= 0 && myArray[i][cellColumn] != -1; i--) {}

  if (curPlayer == "player1") {
    myArray[i][cellColumn] = 0;
    showDisk(cellColumn.toString() + i.toString(), curPlayer);
    curPlayer = "player2";
  } else {
    myArray[i][cellColumn] = 1;
    showDisk(cellColumn.toString() + i.toString(), curPlayer);
    curPlayer = "player1";
  }
}

function showDisk(cell, curPlayer) {
  let diskCell = document.getElementById(cell);
  let disk = diskCell.querySelector(".disk");

  disk.style.visibility = "visible";
  let color = getComputedStyle(document.documentElement).getPropertyValue(
    "--" + curPlayer + "-disk"
  );
  disk.style.backgroundColor = color;
}

function checkWin(row, col) {
  // Check horizontally
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col - 3; j++) {
      if (
        myArray[i][j] != -1 &&
        myArray[i][j] === myArray[i][j + 1] &&
        myArray[i][j] === myArray[i][j + 2] &&
        myArray[i][j] === myArray[i][j + 3]
      ) {
        return { win: true, player: myArray[i][j] };
      }
    }
  }

  // Check vertically
  for (let j = 0; j < col; j++) {
    for (let i = 0; i < row - 3; i++) {
      if (
        myArray[i][j] != -1 &&
        myArray[i][j] === myArray[i + 1][j] &&
        myArray[i][j] === myArray[i + 2][j] &&
        myArray[i][j] === myArray[i + 3][j]
      ) {
        return { win: true, player: myArray[i][j] };
      }
    }
  }

  // Check diagonally (top-left to bottom-right)
  for (let i = 0; i < row - 3; i++) {
    for (let j = 0; j < col - 3; j++) {
      if (
        myArray[i][j] != -1 &&
        myArray[i][j] === myArray[i + 1][j + 1] &&
        myArray[i][j] === myArray[i + 2][j + 2] &&
        myArray[i][j] === myArray[i + 3][j + 3]
      ) {
        return { win: true, player: myArray[i][j] };
      }
    }
  }

  // Check diagonally (top-right to bottom-left)
  for (let i = 0; i < row - 3; i++) {
    for (let j = col - 1; j >= 3; j--) {
      if (
        myArray[i][j] != -1 &&
        myArray[i][j] === myArray[i + 1][j - 1] &&
        myArray[i][j] === myArray[i + 2][j - 2] &&
        myArray[i][j] === myArray[i + 3][j - 3]
      ) {
        return { win: true, player: myArray[i][j] };
      }
    }
  }

  // No winner found
  return { win: false, player: -1 };
}

function resetGame(row, col) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.getElementById(j.toString() + i.toString());
      let disk = cell.querySelector(".disk");

      disk.style.visibility = "hidden";
      disk.style.backgroundColor = "transparent";
    }
  }

  myArray = Array.from({ length: 6 }, () => Array(7).fill(-1));
  curPlayer = "player1";
}

function updateWinsDisplay() {
  let player1WinElement = document.querySelector(".winner-display .red");
  let player2WinElement = document.querySelector(".winner-display .brown");

  player1WinElement.textContent = `${player1Win}`;
  player2WinElement.textContent = `${player2Win}`;
}

makeGrid(6, 7);
