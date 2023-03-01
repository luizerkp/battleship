import Gameboard from "./gameboard";

class Player extends Gameboard {
  // array to keep track of previous attack coodinates to reduce coupling bewteen player1 gameboard and player gameboard. This allows all Players to make attacks without having to know the each other's gameboard state.
  #previousAttackCoordinatesArr = [];

  constructor(name) {
    super();
    this.name = name;
  }

  initAutoShipPlacement() {
    this.ships.forEach((ship) => {
      const shipSize = ship.getSize();
      const shipClass = ship.getClass();

      let randomCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      let placementCoordinates = this.#generateRandomCoordinateSet(randomCoordinate, shipSize);

      while (this.#collision(placementCoordinates)) {
        randomCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        placementCoordinates = this.#generateRandomCoordinateSet(randomCoordinate, shipSize);
      }

      this.placeShip(shipClass, placementCoordinates);
    });
  }

  // method is used for debugging will remove later
  // checkShipStatus() {
  //   const shipStatus = [];
  //   this.ships.forEach((ship) => {
  //     const status = {
  //       shipClass: ship.getClass(),
  //       sunk: ship.isSunk(),
  //       shipSize: ship.getSize(),
  //     };
  //     shipStatus.push(status);
  //   });
  //   return shipStatus;
  // }

  sendAttack(coordinates = null) {
    const attackCoordinates = coordinates || this.#randomMove();
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

  #generateRandomCoordinateSet(coordinate, shipSize) {
    const boardSize = this.getBoardSize();

    const verticalSet = () => {
      const placementCoordinates = [];
      for (let i = 0; i < shipSize; i += 1) {
        const yCoordinate = coordinate[0] + shipSize > boardSize - 1 ? coordinate[0] - i : coordinate[0] + i;
        const xCoordinate = coordinate[1];

        placementCoordinates.push([yCoordinate, xCoordinate]);
      }
      return placementCoordinates;
    };

    const horizontalSet = () => {
      const placementCoordinates = [];
      for (let i = 0; i < shipSize; i += 1) {
        const yCoordinate = coordinate[0];
        const xCoordinate = coordinate[1] + shipSize > boardSize - 1 ? coordinate[1] - i : coordinate[1] + i;

        placementCoordinates.push([yCoordinate, xCoordinate]);
      }
      return placementCoordinates;
    };
    const shipCoordinates = Math.floor(Math.random() * 2) ? verticalSet() : horizontalSet();

    return shipCoordinates;
  }

  #collision(coordinates) {
    const collision = coordinates.some((coordinate) => this.currentBoard.get(coordinate[0])[coordinate[1]].hasShip);
    return collision;
  }

  #arrayEquals(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
  }
}

export default Player;
