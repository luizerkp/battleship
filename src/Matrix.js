let currentMatrix = null;
let resolveGetCurrentMatrix = null;

const updateCurrentMatrix = (matrix) =>
  new Promise((resolve, reject) => {
    try {
      // Update the currentMatrix object with the new matrix data
      currentMatrix = matrix;

      // Resolve any pending getCurrentMatrix promises
      if (resolveGetCurrentMatrix !== null) {
        resolveGetCurrentMatrix(currentMatrix);
        resolveGetCurrentMatrix = null;
      }

      resolve(matrix);
    } catch (error) {
      reject(error);
    }
  });

const getCurrentMatrix = () =>
  new Promise((resolve) => {
    // returns a promise that resolves when updateCurrentMatrix() resolves
    resolveGetCurrentMatrix = resolve;
  });

export { getCurrentMatrix, updateCurrentMatrix };
