import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import gameLoop from "./gameLoop";

const handleNameInputEvent = () => {
  const modal = document.querySelector(".modal");
  const nameInput = document.querySelector("#name-input");
  const beginBtn = document.querySelector(".begin-btn");
  if (nameInput.value.length < 1) {
    nameInput.placeholder = "Sir!, a name is required, sir!";
    return;
  }
  modal.classList.add("hidden");
  gameLoop.initializeGame({ playerOneName: nameInput.value, playerTwoName: "computer" });

  // remove event after initializing player
  beginBtn.removeEventListener("click", handleNameInputEvent);
};

// gameLoop.initialize();
const addBeginEventListener = () => {
  const beginBtn = document.querySelector(".begin-btn");
  beginBtn.addEventListener("click", handleNameInputEvent);
};

// buildPageContent
(() => {
  addBeginEventListener();
  footer.buildFooter();
})();
