import Player from "./Player";

const gameLoop = (() => {
  const start = (name) => {
    const humanPlayer = new Player(name);
    const computer = new Player("computer");
    computer.initAutoShipPlacement();
    // return a prompt human place to placeships or have them place randomly;
  };

  return {
    start,
  };
})();

export default gameLoop;
