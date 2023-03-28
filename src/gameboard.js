import shipFactory from "./ship";

class Gameboard {
  #size = 10;

  constructor() {
    this.currentBoard = this.initBoard();
    this.ships = shipFactory();
  }

  initBoard() {
    const board = new Map();
    for (let i = 0; i < this.#size; i += 1) {
      board.set(
        i,
        [...new Array(this.#size)].fill().map(() => ({
          isHit: false,
          hasShip: false,
          shipClass: null,
        }))
      );
    }
    return board;
  }

  getBoardSize() {
    return this.#size;
  }

  placeShipOnBoard(shipClass, coordinates) {
    if (!shipClass || !Array.isArray(coordinates) || !this.#inBoard(coordinates)) {
      return false;
    }

    coordinates.forEach((coordinate) => {
      this.currentBoard.get(coordinate[0])[coordinate[1]].hasShip = true;
      this.currentBoard.get(coordinate[0])[coordinate[1]].shipClass = shipClass;
    });
    return true;
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

      this.placeShipOnBoard(shipClass, placementCoordinates);
    });
  }

  checkAllShipsSunk() {
    const ships = Array.from(this.ships.values());
    return ships.every((ship) => ship.isSunk() === true);
  }

  receiveAttack(coordinates) {
    const results = {
      attackReceived: false,
      shipHit: false,
      shipClass: null,
      shipSunk: false,
    };

    if (!this.#inBoard([coordinates])) {
      return results;
    }

    const cell = this.currentBoard.get(coordinates[0])[coordinates[1]];

    if (cell.isHit === true) {
      return results;
    }

    cell.isHit = true;
    results.attackReceived = true;

    if (cell.hasShip) {
      this.ships.get(cell.shipClass).hit();
      results.shipClass = cell.shipClass;
      results.shipSunk = this.ships.get(cell.shipClass).isSunk();
      results.shipHit = true;
    }

    return results;
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

  #inBoard(coordinates) {
    const inBoard = coordinates.every((coordinate) => coordinate.every((axis) => axis >= 0 && axis <= this.#size - 1));
    return inBoard;
  }
}

export default Gameboard;
