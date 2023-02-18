class Gameboard {
  constructor() {
    this.board = [...new Array(10)].map(() => [...new Array(10)].fill(0));
  }
}

export default Gameboard;
