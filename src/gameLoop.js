import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay } from "./displayGameboard";
import playerBoardEvents from "./events";
import { getCurrentMatrix } from "./Matrix";

const playerOne = (() => {
  let humanPlayer = null;

  const placeShip = async (shipName) => {
    const playerBoard = document.querySelector("[data-playerOne]");
    playerBoard.dataset.placeShip = shipName.toLowerCase();
    const testmsg = `Please dispatch your ${shipName}`;
    await playerOneGameboardDisplay.displayMessagePrompt(testmsg);
    await playerBoardEvents.shipPlacement();
    const coodinates = await getCurrentMatrix();
    humanPlayer.placeShip(shipName, coodinates);
    console.log(humanPlayer.currentBoard);
    await playerOneGameboardDisplay.displayShipPlacement(coodinates);
  };

  // use recursive call to avoid eslint no-await-in-loop error
  const placeShips = async (shipNames) => {
    // base case shipNames arr empty
    if (shipNames.length === 0) {
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
