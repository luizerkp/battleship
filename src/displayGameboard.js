const buildCellInfo = (x, y) => {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell");
  cellDiv.dataset.x = x;
  cellDiv.dataset.y = y;
  return cellDiv;
};

const playerOneGameboardDisplay = (() => {
  const playerOneGameboard = document.querySelector("[data-player1]");
  const start = (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerOneGameboard.appendChild(currentCell);
      }
    }
  };

  return {
    start,
  };
})();

const playerTwoGameboardDisplay = (() => {
  const playerTwoGameboard = document.querySelector("[data-player2");
  const start = (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerTwoGameboard.appendChild(currentCell);
      }
    }
  };

  return {
    start,
  };
})();

export { playerOneGameboardDisplay, playerTwoGameboardDisplay };
