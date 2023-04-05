const displayWinnerModal = (winnerName) => {
  const playerPrompts = document.querySelector("[data-prompts]");
  playerPrompts.classList.add("hidden");
  const directionDiv = document.querySelector("[data-direction]");
  directionDiv.classList.add("hidden");
  const gameConatiner = document.querySelector(".game-container");
  gameConatiner.classList.add("hidden");

  const modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  const modalContent = document.querySelector(".modal-content");
  modalContent.classList.add("winner");

  // romeove modal content children
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  const winnerText = document.createElement("h1");
  winnerText.textContent = "The winner is: ";

  const winnerNameText = document.createElement("h2");
  winnerNameText.textContent = winnerName;

  modalContent.appendChild(winnerText);
  modalContent.appendChild(winnerNameText);

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.classList.add("play-again");
  playAgainButton.addEventListener(
    "click",
    () => {
      window.location.reload();
    },
    { once: true }
  );
  modalContent.appendChild(playAgainButton);
};

export default displayWinnerModal;
