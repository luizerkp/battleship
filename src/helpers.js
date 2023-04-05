const writeTextOneCharEachTime = async (element, content) => {
  const contentArray = content.split("");
  return new Promise((resolve) => {
    let current = -1;
    const interval = setInterval(() => {
      if (current < contentArray.length - 1) {
        current += 1;
        element.textContent += contentArray[current];
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 35);
  });
};

const craftAttackMessage = ({ results, player }) => {
  const ownershipMsg = player === "playerOne" ? "The enemy's" : "Your";
  const joySadMsg = player === "playerOne" ? "Congratulations!!" : "Oh no!!";
  const attacker = player === "playerOne" ? "Your" : "The enemy's";

  const message = {
    introMessage: `${attacker} attack coordinates received`,
    hitMessage: `${ownershipMsg} ${results.shipClass} has been hit!!`,
    missMessage: "...It's a Miss!!",
    sunkMessage: `${joySadMsg} ${ownershipMsg} ${results.shipClass} has been sunk`,
  };

  return message;
};

const removeShakeAniamtionClass = (e) => {
  e.target.classList.remove("shake");
};

const removeNotPlaceAbleClass = async (e) => {
  setTimeout(async () => {
    e.target.childNodes.forEach((node) => {
      node.classList.remove("not-placeable");
    });
  }, 1000);
};

const resetDisplayAfterShake = (e) => {
  removeShakeAniamtionClass(e);
  // if browsing on a mobile device remove red background from clicked cells
  if (window.matchMedia("(any-pointer:coarse)").matches) {
    removeNotPlaceAbleClass(e);
  }
};

export { writeTextOneCharEachTime, resetDisplayAfterShake, craftAttackMessage };
