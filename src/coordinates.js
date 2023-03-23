let currentcoordinates = null;
let resolveGetCurrentcoordinates = null;

const updateCurrentcoordinates = (coordinates) =>
  new Promise((resolve, reject) => {
    try {
      // Update the currentcoordinates object with the new coordinates data
      currentcoordinates = coordinates;

      // Resolve any pending getCurrentcoordinates promises
      if (resolveGetCurrentcoordinates !== null) {
        resolveGetCurrentcoordinates(currentcoordinates);
        resolveGetCurrentcoordinates = null;
      }

      resolve(coordinates);
    } catch (error) {
      reject(error);
    }
  });

const getCurrentcoordinates = () =>
  new Promise((resolve) => {
    // returns a promise that resolves when updateCurrentcoordinates() resolves
    resolveGetCurrentcoordinates = resolve;
  });

export { getCurrentcoordinates, updateCurrentcoordinates };
