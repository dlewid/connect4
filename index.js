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
    }
  }
  gridContainer.addEventListener("mouseover", (event) => {
    if (event.target.id != "container") {
      displayDiskOnMouseOver(event, row);
    }
  });

  gridContainer.addEventListener("click", (event) => {
    if (event.target.id != "container") {
      cell = event.target;
      placeDisk(cell, row);

      let result = checkWin(row, cols);

      if (result.win || checkForDraw(row, cols)) {
        const winButton = document.getElementById("win-button");
        winButton.style.visibility = "visible";
        let winner = document.querySelector(".winner");

        if (result.player == 0) {
          player1Win++;

          winner.textContent = "Player1 Wins";
          winner.style.color = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--player1-disk");
        } else if (result.player == 1) {
          player2Win++;

          winner.textContent = "Player2 Wins";
          winner.style.color = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--player2");
        } else {
          winner.textContent = "Draw";
        }

        updateWinsDisplay();

        winButton.addEventListener("click", function () {
          resetGame(row, cols, result.player);
          winButton.style.visibility = "hidden";
        });
      }
    }
  });
}

function displayDiskOnMouseOver(event, row) {
  let i = row - 1;
  let cell = event.target;
  let cellColumn = event.target.id[0];

  for (; i >= 0 && myArray[i][cellColumn] != -1; i--) {}
  let disk = document.createElement("div");
  disk.className = "show-disk";

  cell = document.getElementById(cellColumn.toString() + i.toString());

  cell.appendChild(disk);

  let color = getComputedStyle(document.documentElement).getPropertyValue(
    "--" + curPlayer + "-disk-placement"
  );
  disk.style.backgroundColor = color;

  event.target.addEventListener("mouseout", (event) => {
    disk.remove();
  });

  event.target.addEventListener("click", (event) => {
    disk.remove();
  });
}

function placeDisk(cell, row) {
  let disk = document.createElement("div");
  disk.className = "disk";

  let cellColumn = parseInt(cell.id[0]);

  if (myArray[0][cellColumn] > -1) return false;

  let i = row - 1;
  for (; i >= 0 && myArray[i][cellColumn] != -1; i--) {}

  cell = document.getElementById(cellColumn.toString() + i.toString());
  cell.appendChild(disk);

  setDiskColor(cellColumn.toString() + i.toString(), curPlayer);

  if (curPlayer == "player1") {
    myArray[i][cellColumn] = 0;
    curPlayer = "player2";
  } else {
    myArray[i][cellColumn] = 1;
    curPlayer = "player1";
  }
}

function setDiskColor(cell, curPlayer) {
  let diskCell = document.getElementById(cell);
  let disk = diskCell.querySelector(".disk");

  let color = getComputedStyle(document.documentElement).getPropertyValue(
    "--" + curPlayer + "-disk"
  );
  disk.style.backgroundColor = color;
}

function checkWin(row, col) {
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

  return { win: false, player: -1 };
}

function resetGame(row, col, result) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (myArray[i][j] > -1) {
        let cell = document.getElementById(j.toString() + i.toString());
        let disk = cell.querySelector(".disk");

        disk.remove();
      }
    }
  }

  myArray = Array.from({ length: 6 }, () => Array(7).fill(-1));

  if (result == 1) curPlayer = "player2";
  else curPlayer = "player1";
}

function updateWinsDisplay() {
  let player1WinElement = document.querySelector(".winner-display .player1");
  let player2WinElement = document.querySelector(".winner-display .player2");

  player1WinElement.textContent = `${player1Win}`;
  player2WinElement.textContent = `${player2Win}`;
}

function checkForDraw(row, col) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (myArray[i][j] < 0) return false;
    }
  }
  return true;
}

makeGrid(6, 7);
