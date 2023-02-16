import shipFactory from "../src/ship";

test("shipFactory returns a ship Object", () => {
  const output = shipFactory();
  expect(typeof output).toBe("object");
});

test("Test shipFactory returns an array of 5 Ships", () => {
  const ships = shipFactory();
  expect(ships.length).toBe(5);
});
