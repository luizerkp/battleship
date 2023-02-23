import Gameboard from "./gameboard";

class Player extends Gameboard {
  constructor(name) {
    super();
    this.name = name;
  }

  hasNoShips() {
    const ships = Array.from(this.ships.values());
    this.lostGame = ships.every((ship) => ship.isSunk() === true);
    return this.lostGame;
  }

  sendAttack(gameBoard, coordinates = null) {}

  // need to try non-repeating random nums --> may fisher-yates shuffle implementation?
  #randomMove(gameBoard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let cell = gameBoard.get(x)[y];

    while (cell.isHit === true && gameBoard.hasAvailableSpots()) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      cell = gameBoard.get(x)[y];
    }
  }
}

export default Player;
