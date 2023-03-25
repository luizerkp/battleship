import shipClasses from "./shipClasses";
import { updateCurrentcoordinates } from "./coordinates";
import { resetDisplayAfterShake } from "./helpers";

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
  const cellCoordinates = [];
  cells.forEach((cell) => {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    cellCoordinates.push([x, y]);
  });
  await updateCurrentcoordinates(cellCoordinates);
};

const handleShipPlacement = (e) => {
  const currentShip = document.querySelector("[data-playerOne]").dataset.placeShip;
  const currentSelectedDirection = document.querySelector("[data-selected]").value;
  const targetCell = e.target;
  const siblingGroup = [];

  const directionIteratorObj = {
    yDirection: parseInt(targetCell.dataset.x, 10),
    xDirection: parseInt(targetCell.dataset.y, 10),
  };

  let directionIterator = directionIteratorObj[currentSelectedDirection];

  while (siblingGroup.length < ships[currentShip] && directionIterator < 10) {
    const sibling = {
      yDirection: document.querySelector(`.cell[data-x="${directionIterator}"][data-y="${targetCell.dataset.y}"]`),
      xDirection: document.querySelector(`.cell[data-x="${targetCell.dataset.x}"][data-y="${directionIterator}"]`),
    };

    if (sibling[currentSelectedDirection]) {
      siblingGroup.push(sibling[currentSelectedDirection]);
    }

    directionIterator += 1;
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

  if (e.type === "click" && !canPlace) {
    const playerGameboard = document.querySelector("[data-playerOne]");
    playerGameboard.addEventListener("webkitAnimationEnd", resetDisplayAfterShake);
    playerGameboard.classList.add("shake");
  }
};

const directionSelectButtonClickHandler = (e) => {
  const verticalBtn = document.querySelector("[data-vertical]");
  const horisontalBtn = document.querySelector("[data-horizontal]");
  const currentSelectedDirection = document.querySelector("[data-selected]").value;

  switch (e.target.value) {
    case currentSelectedDirection:
      break;
    case verticalBtn.value:
      verticalBtn.setAttribute("id", "selected");
      verticalBtn.dataset.selected = "";
      horisontalBtn.removeAttribute("id");
      delete horisontalBtn.dataset.selected;
      break;
    case horisontalBtn.value:
      horisontalBtn.setAttribute("id", "selected");
      horisontalBtn.dataset.selected = "";
      verticalBtn.removeAttribute("id");
      delete verticalBtn.dataset.selected;
      break;
    default:
      break;
  }
};

export { handleShipPlacement, directionSelectButtonClickHandler };
