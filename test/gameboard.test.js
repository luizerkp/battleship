import Gameboard from "../src/gameboard";

let board;
beforeEach(() => {
  board = new Gameboard();
  board.initBoard();
});

test("Test Gameboard exist", () => {
  expect(new Gameboard()).toBeInstanceOf(Gameboard);
});

test("Test Gameboard is a map object", () => {
  expect(board.currentBoard).toBeInstanceOf(Map);
});

test("Places destroyer at at coordinates [[0,0], [0,1], [0,2]]", () => {
  board.placeShip("destoryer", [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(board.currentBoard.get(0)[0].hasShip).toBe(true);
  expect(board.currentBoard.get(0)[1].hasShip).toBe(true);
  expect(board.currentBoard.get(0)[2].hasShip).toBe(true);
});

test("Test Collisions", () => {
  expect(
    board.placeShip("destoryer", [
      [0, 0],
      [0, 1],
      [0, 2],
    ])
  ).toBe(true);
  expect(
    board.placeShip("carrier", [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ])
  ).toBe(false);
});

test("Gameboard receives attack", () => {
  board.receiveAttack([5, 5]);
  expect(board.currentBoard.get(5)[5].isHit).toBe(true);
});

test("Updates ship hit countter", () => {
  board.placeShip("destoryer", [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  board.receiveAttack([0, 0]);
  expect(board.ships.get("destroyer").getHitsCounter()).toBe(1);
});
