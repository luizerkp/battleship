import shipClasses from "./shipClasses";
import { updateCurrentMatrix } from "./Matrix";

const ships = {};

shipClasses.forEach((ship) => {
  const currentShip = {};
  currentShip[ship.shipClass.toLowerCase()] = ship.size;
  Object.assign(ships, currentShip);
});

const handleHover = ({ siblings, shipSize, e }) => {
  const collision = siblings.some((sibling) => sibling.classList.contains("has-ship"));

  if (siblings.length === shipSize && !collision) {
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

const handleClick = async (cells) => {
  const cellMatrix = [];
  cells.forEach((cell) => {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    cellMatrix.push([x, y]);
  });
  await updateCurrentMatrix(cellMatrix);
};

const handleShipPlacement = (e) => {
  const currentShip = document.querySelector("[data-playerOne]").dataset.placeShip;
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

  const canPlace =
    siblingGroup.length === ships[currentShip] &&
    !siblingGroup.some((sibling) => sibling.classList.contains("has-ship"));

  if (e.type === "click" && canPlace) {
    handleClick(siblingGroup);
  }
};

const playerBoardEvents = (() => {
  const playerGameboardCells = document.querySelector("[data-playerOne]").childNodes;
  const shipPlacement = async () => {
    playerGameboardCells.forEach((cell) => {
      ["mouseenter", "mouseleave", "click"].forEach((e) => cell.addEventListener(e, handleShipPlacement));
    });
  };
  return {
    shipPlacement,
  };
})();

export default playerBoardEvents;
