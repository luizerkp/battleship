import shipFactory from "./ship";

class Gameboard {
  #size;

  constructor() {
    this.board = this.createNewBoard();
    this.#size = 10;
    this.ships = shipFactory();
  }

  createNewBoard() {
    const newBoard = new Map();
    for (let i = 0; i < this.#size; i += 1) {
      newBoard.set(i, [...new Array(10)].fill(0));
    }
    return newBoard;
  }
}

export default Gameboard;
