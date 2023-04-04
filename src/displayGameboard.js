import { writeTextOneCharEachTime } from "./helpers";

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

    // wait for 2 seconds before returning
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(document.body.classList.remove("wait"));
      }, 1000);
    });
  };

  const clearShipPlacementDisplayUI = () => {
    playerPrompts.textContent = "";
    const directionSelectDiv = document.querySelector(".direction-select");
    directionSelectDiv.classList.add("hidden");
  };
  const displayAttackMessage = async (results) => {
    const introMessage = "Attack Coordinates received";
    const hitMessage = `It's a Hit!! on the opponent's ${results.shipClass} `;
    const missMessage = "It's Miss!!";
    const sunkMessage = `Comgratulations!! The opponent's ${results.shipClass} has been sunk`;
    await displayMessagePrompt(introMessage);
    if (results.shipHit) {
      await displayMessagePrompt(hitMessage);
    } else {
      await displayMessagePrompt(missMessage);
    }

    if (results.shipSunk) {
      await displayMessagePrompt(sunkMessage);
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

  // const wait = () => {
  //   playerOneGameboard.classList.add("wait");
  // };

  // const release = () => {
  //   playerOneGameboard.classList.remove("wait");
  // };

  const displayAttackResults = async ({ coordinates, hit }) => {
    const attackedCell = playerOneGameboard.querySelector(
      `.cell[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
    );
    return hit ? attackedCell.classList.add("ship-hit") : attackedCell.classList.add("hit-miss");
  };

  return {
    initialize,
    displayShipPlacement,
    // wait,
    // release,
    displayAttackResults,
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
