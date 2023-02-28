import shipClasses from "./shipClasses";

const createShip = (ship) => {
  let hits = 0;
  const { shipClass, size } = ship;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= size;

  const getHitsCounter = () => hits;

  const resetShip = () => {
    hits = 0;
  };

  return {
    getClass: () => shipClass,
    getSize: () => size,
    hit,
    isSunk,
    getHitsCounter,
    resetShip,
  };
};

const shipFactory = () => {
  const ships = new Map();
  shipClasses.forEach((ship) => {
    const newShip = createShip(ship);
    ships.set(ship.shipClass, newShip);
  });
  return ships;
};

export default shipFactory;
