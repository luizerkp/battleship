import shipClasses from "./shipClasses";

class Ship {
  #hits;

  constructor(shipClass, shipSize) {
    this.class = shipClass;
    this.size = shipSize;
    this.#hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.#hits >= this.size;
  }

  getHitsCounter() {
    return this.#hits;
  }

  resetShip() {
    this.#hits = 0;
  }
}

const shipFactory = () => {
  const ships = new Map();
  shipClasses.forEach((ship) => {
    const newShip = new Ship(ship.class, ship.size);
    ships.set(ship.class, newShip);
  });
  return ships;
};

export default shipFactory;
