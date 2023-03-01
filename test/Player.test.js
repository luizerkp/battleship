import Player from "../src/Player";

let player;
let player2;

beforeEach(() => {
  player = new Player();
  player2 = new Player();
});

afterEach(() => {
  player = null;
  player2 = null;
});
const sinkShip = (ship) => {
  const size = ship.getSize();
  for (let i = 0; i < size; i += 1) {
    ship.hit();
  }
};

const simulateGame = (p1, p2) => {
  p1.initAutoShipPlacement();
  p2.initAutoShipPlacement();

  while (!p1.allShipsSunk() && !p2.allShipsSunk()) {
    const playerAttack = p1.sendAttack();
    const player2Attack = p2.sendAttack();
    if (!p2.allShipsSunk()) {
      p1.receiveAttack(player2Attack);
    }
    if (!p1.allShipsSunk()) {
      p2.receiveAttack(playerAttack);
    }
  }

  return [p1.allShipsSunk(), p2.allShipsSunk()];
};

test("Player exists", () => {
  expect(player).toBeInstanceOf(Player);
});

test("Player extends from Gameboad", () => {
  expect(player.currentBoard).toBeInstanceOf(Map);
});

test("Test reports if all ships are sunk properly", () => {
  expect(player.allShipsSunk()).toBe(false);
  player.ships.forEach((ship) => {
    sinkShip(ship);
  });
  expect(player.allShipsSunk()).toBe(true);
});

test("Pefroms successful attack", () => {
  const player2Attack = player2.sendAttack();
  player.receiveAttack(player2Attack);
  expect(player.currentBoard.get(player2Attack[0])[player2Attack[1]].isHit).toBe(true);
});

test("Simulates game bewteen two players, accepts no ties", () => {
  const results = simulateGame(player, player2);
  expect(results[0] === results[1]).toBe(false);
});
