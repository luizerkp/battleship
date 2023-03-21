import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay } from "./displayGameboard";
import playerBoardHoverEvents from "./events";

const gameLoop = (() => {
  const initializeComputer = () => {
    const computer = new Player("computer");
    playerTwoGameboardDisplay.initialize(computer.getBoardSize());
    // computer.initAutoShipPlacement();
  };
  const placeShips = async (shipsNames) => {
    const playerBoard = document.querySelector("[data-player1]");
    playerBoard.dataset.placeShip = shipsNames[0].toLowerCase();
    const testmsg = `Please dispatch your ${shipsNames[0]}`;
    await playerOneGameboardDisplay.displayMessagePrompt(testmsg);
    playerBoardHoverEvents.shipPlacement();
  };

  const initializePlayer = async (name) => {
    const humanPlayer = new Player(name);
    const shipsNames = Array.from(humanPlayer.ships.keys());
    const greeting = `Welcome, admiral ${humanPlayer.name}, it is time to dispatch your warships`;
    await playerOneGameboardDisplay.initialize(humanPlayer.getBoardSize());
    await playerOneGameboardDisplay.displayMessagePrompt(greeting);
    placeShips(shipsNames);
  };

  return {
    initializePlayer,
    initializeComputer,
  };
})();

export default gameLoop;
