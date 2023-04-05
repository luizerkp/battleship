import { writeTextOneCharEachTime, craftAttackMessage } from "./helpers";

const buildCellInfo = (x, y) => {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell");
  cellDiv.dataset.x = x;
  cellDiv.dataset.y = y;
  return cellDiv;
};

const userPrompts = (() => {
  const playerPrompts = document.querySelector("[data-prompts]");

  const revealUserPrompts = () => {
    playerPrompts.classList.remove("hidden");
  };

  const displayMessagePrompt = async (message) => {
    document.body.classList.add("wait");

    playerPrompts.textContent = "";
    await writeTextOneCharEachTime(playerPrompts, message);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(document.body.classList.remove("wait"));
      }, 800);
    });
  };

  const clearShipPlacementDisplayUI = () => {
    playerPrompts.textContent = "";
    const directionSelectDiv = document.querySelector(".direction-select");
    directionSelectDiv.classList.add("hidden");
  };

  const displayAttackMessage = async ({ results, player }) => {
    const message = craftAttackMessage({ results, player });
    await displayMessagePrompt(message.introMessage);

    if (results.shipHit) {
      await displayMessagePrompt(message.hitMessage);
    } else {
      await displayMessagePrompt(message.missMessage);
    }

    if (results.shipSunk) {
      await displayMessagePrompt(message.sunkMessage);
    }
  };
  return {
    displayMessagePrompt,
    clearShipPlacementDisplayUI,
    revealUserPrompts,
    displayAttackMessage,
  };
})();

const playerOneGameboardDisplay = (() => {
  const playerOneGameboard = document.querySelector("[data-playerOne]");
  const directionSelect = document.querySelector("[data-direction]");

  const initialize = async (size) => {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const currentCell = buildCellInfo(x, y);
        playerOneGameboard.appendChild(currentCell);
      }
    }
    playerOneGameboard.classList.add("active");
    userPrompts.revealUserPrompts();
    directionSelect.classList.remove("hidden");
  };

  const displayShipPlacement = async (coordinates) => {
    const coordinateDivs = [];
    coordinates.forEach((coordinate) => {
      const currentDiv = document.querySelector(`.cell[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);
      coordinateDivs.push(currentDiv);
    });

    coordinateDivs.forEach((div) => {
      div.classList.add("has-ship");
    });
  };

  const displayShipPlacementShipName = async (shipName) => {
    playerOneGameboard.dataset.placeShip = shipName.toLowerCase();
    const testmsg = `Please dispatch your ${shipName}`;
    await userPrompts.displayMessagePrompt(testmsg);
  };

  const addShipPlacementPointerUI = () => {
    playerOneGameboard.classList.add("cursor-pointer");
  };

  const clearShipPlacementDisplayUI = () => {
    playerOneGameboard.dataset.placeShip = "";
    playerOneGameboard.classList.remove("cursor-pointer");
    playerOneGameboard.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("highlight");
    });
  };

  const displayAttackResults = async ({ coordinates, hit }) => {
    const attackedCell = playerOneGameboard.querySelector(
      `.cell[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
    );
    return hit ? attackedCell.classList.add("ship-hit") : attackedCell.classList.add("hit-miss");
  };

  return {
    initialize,
    displayShipPlacement,
    displayAttackResults,
    displayShipPlacementShipName,
    addShipPlacementPointerUI,
    clearShipPlacementDisplayUI,
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
    playerTwoGameboard.classList.add("cursor-crosshair");
  };
  const wait = () => {
    playerTwoGameboard.classList.add("wait");
  };

  const release = () => {
    playerTwoGameboard.classList.remove("wait");
  };

  const displayAttackResults = async ({ coordinates, hit }) => {
    const attackedCell = playerTwoGameboard.querySelector(
      `.cell[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
    );
    return hit ? attackedCell.classList.add("ship-hit") : attackedCell.classList.add("hit-miss");
  };

  return {
    initialize,
    activateGameboard,
    displayAttackResults,
    wait,
    release,
  };
})();

export { playerOneGameboardDisplay, playerTwoGameboardDisplay, userPrompts };
