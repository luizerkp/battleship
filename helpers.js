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
    }, 75);
  });
};

export default writeTextOneCharEachTime;
