import Gameboard from "./gameboard";

class Player extends Gameboard {
  #previousAttackCoordidates = [];

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

  // returns a random coordinate that has not be hit, **new aproach needs testing
  #randomMove() {
    if (this.#isPreiviousAttackCoordinate.length >= 100) {
      return null;
    }

    let xCoordinate = Math.floor(Math.random() * 10);
    let yCoordinate = Math.floor(Math.random() * 10);

    while (this.#isPreiviousAttackCoordinate(xCoordinate, yCoordinate) === true) {
      xCoordinate = Math.floor(Math.random() * 10);
      yCoordinate = Math.floor(Math.random() * 10);
    }
    const attackCoordinates = [xCoordinate, yCoordinate];
    this.#isPreiviousAttackCoordinate.push(attackCoordinates);

    return attackCoordinates;
  }

  #isPreiviousAttackCoordinate(x, y) {
    return this.#isPreiviousAttackCoordinate.some((coordinate) => coordinate[0] === x && coordinate[1] === y);
  }
}

export default Player;
