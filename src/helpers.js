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
    }, 70);
  });
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

export { writeTextOneCharEachTime, resetDisplayAfterShake };
