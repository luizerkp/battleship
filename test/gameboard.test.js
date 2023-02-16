import Gameboard from "../src/gameboard";

test("Test Gameboard exist", () => {
  expect(new Gameboard()).toBeInstanceOf(Gameboard);
});
