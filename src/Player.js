import Gameboard from "./gameboard";

class Player extends Gameboard {
  // array to keep track of previous attack coodinates to reduce coupling bewteen player1 gameboard and player gameboard. This allows all Players to make attacks without having to know the each other's gameboard state.
  #previousAttackCoordinatesArr = [];

  constructor(name) {
    super();
    this.name = name;
  }

  sendRandomAttack() {
    const attackCoordinates = this.#randomMove();
    return attackCoordinates;
  }

  // returns a random coordinate that has not be hit
  #randomMove() {
    if (this.#previousAttackCoordinatesArr.length >= 100) {
      return null;
    }

    let xCoordinate = Math.floor(Math.random() * 10);
    let yCoordinate = Math.floor(Math.random() * 10);

    while (this.#isPreiviousAttackCoordinate(xCoordinate, yCoordinate)) {
      xCoordinate = Math.floor(Math.random() * 10);
      yCoordinate = Math.floor(Math.random() * 10);
    }
    const attackCoordinates = [xCoordinate, yCoordinate];
    this.#previousAttackCoordinatesArr.push(attackCoordinates);

    return attackCoordinates;
  }

  #isPreiviousAttackCoordinate(x, y) {
    return this.#previousAttackCoordinatesArr.some((coordinate) => this.#arrayEquals(coordinate, [x, y]));
  }

  #arrayEquals(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
  }
}

export default Player;
