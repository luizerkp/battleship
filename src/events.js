import { handleShipPlacement, directionSelectButtonClickHandler } from "./shipPlacement";

const playerBoardEvents = (() => {
  const playerOneGameboardCells = document.querySelector("[data-playerOne]").childNodes;
  // const playerTwoGameboardCells = document.querySelector("[data-playerTwo]").childNodes;
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

  // const addPlayerOneAttackEvents = () => {

  // }

  return {
    addShipPlacementEvents,
    removeShipPlacementEvents,
  };
})();

export default playerBoardEvents;
