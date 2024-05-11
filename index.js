const gridContainer = document.getElementById("container");
let curPlayer = "redish";

let redWins = 0;
let brownWins = 0;

let myArray = Array.from({ length: 6 }, () => Array(7).fill(-1));

function makeGrid(row, cols) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.id = j.toString() + i.toString();
      gridContainer.appendChild(cell);
      cell.addEventListener("click", function () {
        placeDisk(cell, row);
        myArray.forEach((row) => console.log(row));
        let result = checkWin(row, cols);
        if (result.win) {
          if (result.player == 0) redWins++;
          else brownWins++;
          updateWinsDisplay();
          const winButton = document.getElementById("win-button");
          winButton.style.visibility = "visible";
          let winner = document.querySelector(".winner");
          if (result.player == 0) {
            winner.textContent = "Red Wins";
            winner.style.color = getComputedStyle(
              document.documentElement
            ).getPropertyValue("--redish");
          } else {
            winner.textContent = "Brown Wins";
            winner.style.color = getComputedStyle(
              document.documentElement
            ).getPropertyValue("--brownish");
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

  if (curPlayer == "redish") {
    myArray[i][cellColumn] = 0;
    showDisk(cellColumn.toString() + i.toString(), curPlayer);
    curPlayer = "brownish";
  } else {
    myArray[i][cellColumn] = 1;
    showDisk(cellColumn.toString() + i.toString(), curPlayer);
    curPlayer = "redish";
  }
}

function showDisk(cell, curPlayer) {
  let diskCell = document.getElementById(cell);
  let disk = diskCell.querySelector(".disk");

  disk.style.visibility = "visible";
  let color = getComputedStyle(document.documentElement).getPropertyValue(
    "--" + curPlayer
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
  curPlayer = "redish";
}

function updateWinsDisplay() {
  let redWinsElement = document.querySelector(".winner-display .red");
  let brownWinsElement = document.querySelector(".winner-display .brown");

  redWinsElement.textContent = `red wins: ${redWins}`;
  brownWinsElement.textContent = `brown wins: ${brownWins}`;
}

makeGrid(6, 7);
