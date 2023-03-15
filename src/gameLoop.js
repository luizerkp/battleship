import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay } from "./displayGameboard";

const gameLoop = (() => {
  const initializePlayer = (name) => {
    const humanPlayer = new Player(name);
    playerOneGameboardDisplay.initialize({ name: humanPlayer.name, size: humanPlayer.getBoardSize() });
    // return a prompt human place to placeships or have them place randomly;
  };
  const initializeComputer = () => {
    const computer = new Player("computer");
    playerTwoGameboardDisplay.initialize(computer.getBoardSize());
    // computer.initAutoShipPlacement();
  };

  return {
    initializePlayer,
    initializeComputer,
  };
})();

export default gameLoop;
