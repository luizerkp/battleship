import { handleShipPlacement, directionSelectButtonClickHandler } from "./shipPlacement";
import handleAttack from "./attackHandler";

const playerBoardEvents = (() => {
  const playerOneGameboardCells = document.querySelector("[data-playerOne]").childNodes;
  const playerTwoGameboardCells = document.querySelector("[data-playerTwo]").childNodes;
  const verticalBtn = document.querySelector("[data-vertical]");
  const horisontalBtn = document.querySelector("[data-horizontal]");

  const addShipPlacementEvents = async () => {
    playerOneGameboardCells.forEach((cell) => {
      ["mouseenter", "mouseleave", "click"].forEach((e) => cell.addEventListener(e, handleShipPlacement));
    });

    verticalBtn.addEventListener("click", directionSelectButtonClickHandler);
    horisontalBtn.addEventListener("click", directionSelectButtonClickHandler);
  };

  const removeShipPlacementEvents = () => {
    playerOneGameboardCells.forEach((cell) => {
      ["mouseenter", "mouseleave", "click"].forEach((e) => cell.removeEventListener(e, handleShipPlacement));
    });

    verticalBtn.removeEventListener("click", directionSelectButtonClickHandler);
    horisontalBtn.removeEventListener("click", directionSelectButtonClickHandler);
  };

  const addAttackEvents = async () => {
    playerTwoGameboardCells.forEach((cell) => {
      cell.addEventListener("click", handleAttack);
    });
  };

  return {
    addShipPlacementEvents,
    removeShipPlacementEvents,
    addAttackEvents,
  };
})();

export default playerBoardEvents;
