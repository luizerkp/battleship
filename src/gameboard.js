import shipFactory from "./ship";

class Gameboard {
  #size;

  constructor() {
    this.currentBoard = new Map();
    this.#size = 10;
    this.ships = shipFactory();
  }

  initBoard() {
    for (let i = 0; i < this.#size; i += 1) {
      this.currentBoard.set(
        i,
        [...new Array(this.#size)].fill().map(() => ({
          isHit: false,
          hasShip: false,
          shipClass: null,
        }))
      );
    }
  }

  getBoardSize() {
    return this.#size;
  }

  placeShip(shipClass, coordinates) {
    if (!this.#legalMove(coordinates)) {
      return false;
    }

    coordinates.forEach((coordinate) => {
      this.currentBoard.get(coordinate[0])[coordinate[1]].hasShip = true;
      this.currentBoard.get(coordinate[0])[coordinate[1]].shipClass = shipClass;
    });
    return true;
  }

  receiveAttack(coordinates) {
    if (!this.#inBoard([coordinates])) {
      return false;
    }

    const cell = this.currentBoard.get(coordinates[0])[coordinates[1]];
    cell.isHit = true;
    if (cell.hasShip) {
      this.ships.get(cell.shipClass).hit();
    }

    return true;
  }

  #legalMove(coordinates) {
    const isInBoard = this.#inBoard(coordinates);
    const hasCollision = this.#collision(coordinates);
    return isInBoard && !hasCollision;
  }

  #inBoard(coordinates) {
    const inBoard = coordinates.every((coordinate) => coordinate.every((axis) => axis >= 0 && axis <= this.#size - 1));
    return inBoard;
  }

  #collision(coordinates) {
    const collision = coordinates.some((coordinate) => this.currentBoard.get(coordinate[0])[coordinate[1]].hasShip);
    return collision;
  }
}

export default Gameboard;
