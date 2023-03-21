import shipClasses from "./shipClasses";

const ships = {};

shipClasses.forEach((ship) => {
  const currentShip = {};
  currentShip[ship.shipClass.toLowerCase()] = ship.size;
  Object.assign(ships, currentShip);
});

const handleHover = ({ siblings, shipSize, e }) => {
  if (siblings.length === shipSize) {
    siblings.forEach((sibling) => {
      if (e.type === "mouseenter") {
        sibling.classList.add("highlight");
      }
      if (e.type === "mouseleave") {
        sibling.classList.remove("highlight");
      }
    });
  } else {
    siblings.forEach((sibling) => {
      if (e.type === "mouseenter") {
        sibling.classList.add("not-placeable");
      }
      if (e.type === "mouseleave") {
        sibling.classList.remove("not-placeable");
      }
    });
  }
};

const handleClick = (cells) => {
  const cellMatrix = [];
  cells.forEach((cell) => {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    cellMatrix.push([x, y]);
  });
  console.log(cellMatrix);
};

const handleShipPlacement = (e) => {
  const currentShip = document.querySelector("[data-player1]").dataset.placeShip;
  const targetCell = e.target;
  const siblingGroup = [];
  let x = parseInt(targetCell.dataset.x, 10);

  while (siblingGroup.length < ships[currentShip] && x < 10) {
    const sibling = document.querySelector(`.cell[data-x="${x}"][data-y="${targetCell.dataset.y}"]`);
    if (sibling) siblingGroup.push(sibling);
    x += 1;
  }

  if (e.type === "mouseenter" || e.type === "mouseleave") {
    handleHover({ siblings: siblingGroup, shipSize: ships[currentShip], e });
  }

  if (e.type === "click" && siblingGroup.length === ships[currentShip]) {
    handleClick(siblingGroup);
  }
};

const playerBoardEvents = (() => {
  const playerGameboardCells = document.querySelector("[data-player1]").childNodes;
  const shipPlacement = () => {
    playerGameboardCells.forEach((cell) => {
      ["mouseenter", "mouseleave", "click"].forEach((e) => cell.addEventListener(e, handleShipPlacement));
    });
  };
  return {
    shipPlacement,
  };
})();

export default playerBoardEvents;
