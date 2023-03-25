import { writeTextOneCharEachTime } from "./helpers";

const buildCellInfo = (x, y) => {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell");
  cellDiv.dataset.x = x;
  cellDiv.dataset.y = y;
  return cellDiv;
};

const playerOneGameboardDisplay = (() => {
  const playerOneGameboard = document.querySelector("[data-playerOne]");
  const playerPrompts = document.querySelector("[data-prompts]");
  const directionSelect = document.querySelector("[data-direction]");

  const initialize = async (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerOneGameboard.appendChild(currentCell);
      }
    }
    playerOneGameboard.classList.add("active");
    playerPrompts.classList.remove("hidden");
    directionSelect.classList.remove("hidden");
  };

  const displayMessagePrompt = async (message) => {
    document.body.classList.add("wait");

    playerPrompts.textContent = "";
    await writeTextOneCharEachTime(playerPrompts, message);

    // wait for 2 seconds before returning
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(document.body.classList.remove("wait"));
      }, 1000);
    });
  };

  const displayShipPlacement = async (coordinates) => {
    const coodinateDivs = [];
    coordinates.forEach((coordinate) => {
      const currentDiv = document.querySelector(`.cell[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);
      coodinateDivs.push(currentDiv);
    });

    coodinateDivs.forEach((div) => {
      div.dataset.hasShip = "";
      div.classList.add("has-ship");
    });
  };

  return {
    initialize,
    displayMessagePrompt,
    displayShipPlacement,
  };
})();

const playerTwoGameboardDisplay = (() => {
  const playerTwoGameboard = document.querySelector("[data-playerTwo]");
  const initialize = (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerTwoGameboard.appendChild(currentCell);
      }
    }
  };

  const activateGameboard = () => {
    playerTwoGameboard.classList.add("active");
  };

  return {
    initialize,
    activateGameboard,
  };
})();

const clearShipPlacementDisplayUI = () => {
  const playerPrompts = document.querySelector(".player-prompts");
  playerPrompts.textContent = "";
  const directionSelectDiv = document.querySelector(".direction-select");
  directionSelectDiv.classList.add("hidden");
};

export { playerOneGameboardDisplay, playerTwoGameboardDisplay, clearShipPlacementDisplayUI };
