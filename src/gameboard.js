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

  placeShip(shipClass, coordinates) {
    if (!shipClass || !Array.isArray(coordinates) || !this.#inBoard(coordinates)) {
      return false;
    }

    coordinates.forEach((coordinate) => {
      this.currentBoard.get(coordinate[0])[coordinate[1]].hasShip = true;
      this.currentBoard.get(coordinate[0])[coordinate[1]].shipClass = shipClass;
    });
    return true;
  }

  allShipsSunk() {
    const ships = Array.from(this.ships.values());
    return ships.every((ship) => ship.isSunk() === true);
  }

  receiveAttack(coordinates) {
    const results = {
      attackReceived: false,
      shipHit: false,
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
      results.shipHit = true;
    }

    return results;
  }

  #inBoard(coordinates) {
    const inBoard = coordinates.every((coordinate) => coordinate.every((axis) => axis >= 0 && axis <= this.#size - 1));
    return inBoard;
  }
}

export default Gameboard;
