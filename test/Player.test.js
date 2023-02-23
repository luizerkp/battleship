import Player from "../src/Player";

let player;

beforeEach(() => {
  player = new Player();
});

const sinkShip = (ship) => {
  const size = ship.getSize();
  for (let i = 0; i < size; i += 1) {
    ship.hit();
  }
};

test("Player exists", () => {
  expect(player).toBeInstanceOf(Player);
});

test("Player extends from Gameboad", () => {
  expect(player.currentBoard).toBeInstanceOf(Map);
});

test("Test reports if all ships are sunk properly", () => {
  expect(player.hasNoShips()).toBe(false);
  player.ships.forEach((ship) => {
    sinkShip(ship);
  });
  expect(player.hasNoShips()).toBe(true);
});
