import Player from "./Player";
import { playerOneGameboardDisplay, playerTwoGameboardDisplay, userPrompts } from "./displayGameboard";
import playerBoardEvents from "./events";
import { getCurrentcoordinates } from "./coordinates";
import displayWinnerModal from "./displayWinner";

const playerTwo = (() => {
  let computer = null;

  const initialize = () => {
    computer = new Player("computer");
    playerTwoGameboardDisplay.initialize(computer.getBoardSize());
    computer.initAutoShipPlacement();
  };

  const checkLost = () => computer.checkAllShipsSunk();

  const receiveAttackCoordinates = (coordinates) => computer.receiveAttack(coordinates);

  const sendAttackCoordinates = () => computer.sendRandomAttack();

  const getName = () => computer.name;

  return {
    initialize,
    checkLost,
    receiveAttackCoordinates,
    sendAttackCoordinates,
    getName,
  };
})();

const playerOne = (() => {
  let humanPlayer = null;

  const clearShipPlacementUI = () => {
    playerTwoGameboardDisplay.activateGameboard();
    userPrompts.clearShipPlacementDisplayUI();
    playerBoardEvents.removeShipPlacementEvents();
    playerOneGameboardDisplay.clearShipPlacementDisplayUI();
  };

  const placeShip = async (shipName) => {
    await playerOneGameboardDisplay.displayShipPlacementShipName(shipName);
    await playerBoardEvents.addShipPlacementEvents();
    const coodinates = await getCurrentcoordinates();

    // trys to update player's currentBoard property
    const success = humanPlayer.placeShipOnBoard(shipName, coodinates);

    // throw error if humanPlayer.placeShipOnBoard returns false;
    if (!success) {
      throw new Error("Unable to update player gameboard");
    }

    await playerOneGameboardDisplay.displayShipPlacement(coodinates);
  };

  // use recursive call to avoid eslint no-await-in-loop error
  const placeShips = async (shipNames) => {
    if (shipNames.length === 0) {
      return;
    }

    // use object destructuring to get the next ship in line and an array of remainingShipNames
    const [currentShipName, ...remainingShipNames] = shipNames;
    try {
      await placeShip(currentShipName);
    } catch (error) {
      console.log(error);
    }
    await placeShips(remainingShipNames);
  };

  const initialize = async (name) => {
    humanPlayer = new Player(name);
    const shipsNames = Array.from(humanPlayer.ships.keys());
    const greeting = `Welcome, admiral ${humanPlayer.name}, it is time to dispatch your warships`;
    await playerOneGameboardDisplay.initialize(humanPlayer.getBoardSize());
    await userPrompts.displayMessagePrompt(greeting);
    playerOneGameboardDisplay.addShipPlacementPointerUI();
    await placeShips(shipsNames);
    clearShipPlacementUI();
  };

  const checkLost = () => humanPlayer.checkAllShipsSunk();

  const receiveAttackCoordinates = (coordinates) => humanPlayer.receiveAttack(coordinates);

  const getName = () => humanPlayer.name;

  return {
    initialize,
    checkLost,
    receiveAttackCoordinates,
    getName,
  };
})();

const gameLoop = (() => {
  const checkWinner = () => {
    const winner = {
      winnerFound: playerOne.checkLost() || playerTwo.checkLost(),
      name: null,
    };

    if (playerOne.checkLost() || playerTwo.checkLost()) {
      winner.name = playerOne.checkLost() ? playerTwo.getName() : playerOne.getName();
    }
    return winner;
  };
  const playGameSequence = async () => {
    const playerOneAttackCoordinates = await getCurrentcoordinates();
    const resultsPlayerOneAttack = await playerTwo.receiveAttackCoordinates(playerOneAttackCoordinates);

    playerTwoGameboardDisplay.wait();

    if (resultsPlayerOneAttack.attackReceived) {
      await userPrompts.displayAttackMessage({ results: resultsPlayerOneAttack, player: "playerOne" });
      playerTwoGameboardDisplay.displayAttackResults({
        hit: resultsPlayerOneAttack.shipHit,
        coordinates: playerOneAttackCoordinates,
      });
    } else {
      playerTwoGameboardDisplay.release();
      await playGameSequence();
    }

    if (!checkWinner().winnerFound) {
      setTimeout(async () => {
        const playerTwoAttackCoordinates = await playerTwo.sendAttackCoordinates();
        const resultsPlayerTwoAttack = await playerOne.receiveAttackCoordinates(playerTwoAttackCoordinates);

        if (resultsPlayerTwoAttack.attackReceived) {
          await userPrompts.displayAttackMessage({ results: resultsPlayerTwoAttack, player: "playerTwo" });
          await playerOneGameboardDisplay.displayAttackResults({
            hit: resultsPlayerTwoAttack.shipHit,
            coordinates: playerTwoAttackCoordinates,
          });
          playerTwoGameboardDisplay.release();
        }
      }, 800);
    }

    if (!checkWinner().winnerFound) {
      await playGameSequence();
    }

    return checkWinner().name;
  };

  const initializeGame = async ({ playerOneName, PlayerTwoName }) => {
    await playerOne.initialize(playerOneName);
    playerTwo.initialize(PlayerTwoName);
    await playerBoardEvents.addAttackEvents();
    const winnerName = await playGameSequence();
    return displayWinnerModal(winnerName);
  };

  return {
    initializeGame,
  };
})();

export default gameLoop;
