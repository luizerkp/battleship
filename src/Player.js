import Gameboard from "./gameboard";

class Player extends Gameboard {
  #availabelXCoordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  #availabelYCoordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(name) {
    super();
    this.name = name;
  }

  hasNoShips() {
    const ships = Array.from(this.ships.values());
    this.lostGame = ships.every((ship) => ship.isSunk() === true);
    return this.lostGame;
  }

  sendAttack(coordinates = null) {
    const attackCoordinates = coordinates || this.#randomMove();
    return attackCoordinates;
  }

  // returns a random coordinate that has not be hit; **There is a bug here will not work as expected, need to work on the logic here
  #randomMove() {
    if (this.#availabelXCoordinates.length === 0 || this.#availabelYCoordinates.length === 0) {
      return -1;
    }

    const xIndex = Math.floor(Math.random() * this.#availabelXCoordinates.length);
    const yIndex = Math.floor(Math.random() * this.#availabelYCoordinates.length);

    // save coordinates
    const coordinates = [this.#availabelXCoordinates[xIndex], this.#availabelYCoordinates[yIndex]];

    // remove from pool of coordinates
    this.#availabelXCoordinates.splice(xIndex, 1);
    this.#availabelYCoordinates.splice(yIndex, 1);

    return coordinates;
  }
}

export default Player;
