import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay } from "./displayGameboard";

const gameLoop = (() => {
  const start = (name) => {
    const humanPlayer = new Player(name);
    const computer = new Player("computer");
    playerOneGameboardDisplay.start(humanPlayer.getBoardSize());
    playerTwoGameboardDisplay.start(computer.getBoardSize());
    // computer.initAutoShipPlacement();
    // return a prompt human place to placeships or have them place randomly;
  };

  return {
    start,
  };
})();

export default gameLoop;
