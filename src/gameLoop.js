import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay, clearShipPlacementDisplayUI } from "./displayGameboard";
import playerBoardEvents from "./events";
import { getCurrentMatrix } from "./Matrix";

const playerTwo = (() => {
  let computer = null;
  const initialize = () => {
    computer = new Player("computer");
    playerTwoGameboardDisplay.initialize(computer.getBoardSize());
    computer.initAutoShipPlacement();
  };

  return {
    initialize,
  };
})();

const playerOne = (() => {
  let humanPlayer = null;

  const placeShip = async (shipName) => {
    const playerBoard = document.querySelector("[data-playerOne]");
    playerBoard.dataset.placeShip = shipName.toLowerCase();
    const testmsg = `Please dispatch your ${shipName}`;
    await playerOneGameboardDisplay.displayMessagePrompt(testmsg);
    await playerBoardEvents.addShipPlacementEvents();
    const coodinates = await getCurrentMatrix();

    // trys to update player's currentBoard property
    const success = humanPlayer.placeShipOnBoard(shipName, coodinates);
    console.log(humanPlayer.currentBoard);

    // throw error if humanPlayer.placeShipOnBoard returns false;
    if (!success) {
      throw new Error("Unable to uodate player gameboard");
    }

    await playerOneGameboardDisplay.displayShipPlacement(coodinates);
  };

  // use recursive call to avoid eslint no-await-in-loop error
  const placeShips = async (shipNames) => {
    if (shipNames.length === 0) {
      playerTwoGameboardDisplay.activateGameboard();
      clearShipPlacementDisplayUI();
      playerBoardEvents.removeShipPlacementEvents();
      return;
    }

    // use object destructuring to get the next ship in line and an array of remainingShipNames
    const [currentShipName, ...remainingShipNames] = shipNames;
    try {
      await placeShip(currentShipName);
    } catch (error) {
      console.log(error);
    }
    await placeShips(remainingShipNames);
  };

  const initialize = async (name) => {
    humanPlayer = new Player(name);
    const shipsNames = Array.from(humanPlayer.ships.keys());
    const greeting = `Welcome, admiral ${humanPlayer.name}, it is time to dispatch your warships`;
    await playerOneGameboardDisplay.initialize(humanPlayer.getBoardSize());
    await playerOneGameboardDisplay.displayMessagePrompt(greeting);
    placeShips(shipsNames);
  };

  return {
    initialize,
  };
})();

const gameLoop = (() => {
  const initializeGame = ({ playerOneName, PlayerTwoName }) => {
    playerOne.initialize(playerOneName);
    playerTwo.initialize(PlayerTwoName);
  };

  return {
    initializeGame,
  };
})();

export default gameLoop;
