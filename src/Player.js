import Gameboard from "./gameboard";

class Player extends Gameboard {
  // array to keep track of previous attack coodinates to reduce coupling bewteen player1 gameboard and player gameboard. This allow player1 one AI to make attacks without having to know player2's gameboard state.
  #previousAttackCoordinatesArr = [];

  constructor(name) {
    super();
    this.name = name;
  }

  initAutoShipPlacement() {
    // console.log(this.ships);
    this.ships.forEach((ship) => {
      const shipSize = ship.getSize();
      const shipClass = ship.getClass();

      let randomCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      let placementCoordinates = this.#generateRandomCoordinateSet(randomCoordinate, shipSize);

      while (this.#collision(placementCoordinates)) {
        randomCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        placementCoordinates = this.#generateRandomCoordinateSet(randomCoordinate, shipSize);
      }
      // console.log(shipClass, placementCoordinates);
      this.placeShip(shipClass, placementCoordinates);
    });
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

  // returns a random coordinate that has not be hit
  #randomMove() {
    if (this.#previousAttackCoordinatesArr.length >= 100) {
      return null;
    }

    let xCoordinate = Math.floor(Math.random() * 10);
    let yCoordinate = Math.floor(Math.random() * 10);

    while (this.#isPreiviousAttackCoordinate(xCoordinate, yCoordinate) === true) {
      xCoordinate = Math.floor(Math.random() * 10);
      yCoordinate = Math.floor(Math.random() * 10);
    }
    const attackCoordinates = [yCoordinate, xCoordinate];
    this.#previousAttackCoordinatesArr.push(attackCoordinates);

    return attackCoordinates;
  }

  #isPreiviousAttackCoordinate(x, y) {
    return this.#previousAttackCoordinatesArr.some((coordinate) => coordinate[0] === x && coordinate[1] === y);
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
}

export default Player;
