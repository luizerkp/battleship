const getShipClassesArray = () => {
  const shipClasses = [
    {
      class: "Carrier",
      size: 5,
    },
    {
      class: "Battleship",
      size: 4,
    },
    {
      class: "Destroyer",
      size: 3,
    },
    {
      class: "Submarine",
      size: 3,
    },
    {
      class: "Patrol Boat",
      size: 2,
    },
  ];

  return shipClasses;
};

class Ship {
  constructor(shipClass, shipSize) {
    this.class = shipClass;
    this.size = shipSize;
    this.hits = 0;
    this.location = {
      x: null,
      y: null,
    };
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size;
  }

  setLocation(xCoordinate, yCoordinate) {
    this.location.x = xCoordinate;
    this.location.y = yCoordinate;
  }

  resetShip() {
    this.hits = 0;
    this.location = {
      x: null,
      y: null,
    };
  }
}

const shipFactory = () => {
  const shipClasses = getShipClassesArray();
  const ships = [];
  shipClasses.forEach((ship) => {
    const newShip = new Ship(ship.class, ship.size);
    ships.push(newShip);
  });
  return ships;
};

export default shipFactory;
