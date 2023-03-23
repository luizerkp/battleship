import { updateCurrentcoordinates } from "./coordinates";

const handleAttack = async (e) => {
  if (!e.target.dataset.hit) {
    const coordinates = [];
    coordinates.push(parseInt(e.target.dataset.x, 10), parseInt(e.target.dataset.y, 10));
    await updateCurrentcoordinates(coordinates);
  }
};

export default handleAttack;
