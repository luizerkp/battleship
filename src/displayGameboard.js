const buildCellInfo = (x, y) => {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell");
  cellDiv.dataset.x = x;
  cellDiv.dataset.y = y;
  return cellDiv;
};

const playerOneGameboardDisplay = (() => {
  const playerOneGameboard = document.querySelector("[data-player1]");
  const playerPrompts = document.querySelector(".player-prompts");

  const initialize = ({ size, name }) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerOneGameboard.appendChild(currentCell);
      }
    }
    playerOneGameboard.classList.add("active");
    playerPrompts.textContent = `Hello, admiral ${name} would you like to place your warships?`;
    playerPrompts.classList.remove("hidden");
  };

  return {
    initialize,
  };
})();

const playerTwoGameboardDisplay = (() => {
  const playerTwoGameboard = document.querySelector("[data-player2");
  const initialize = (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerTwoGameboard.appendChild(currentCell);
      }
    }
  };

  return {
    initialize,
  };
})();

export { playerOneGameboardDisplay, playerTwoGameboardDisplay };
