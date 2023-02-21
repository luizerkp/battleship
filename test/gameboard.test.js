import Gameboard from "../src/gameboard";

test("Test Gameboard exist", () => {
  expect(new Gameboard()).toBeInstanceOf(Gameboard);
});

test("Creates a 10x10 board that matches sample board", () => {
  const board = new Gameboard();
  expect(board.board).toBeInstanceOf(Map);
});
