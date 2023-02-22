import shipFactory from "../src/ship";

test("shipFactory returns a ship Object", () => {
  const output = shipFactory();
  expect(output).toBeInstanceOf(Map);
});

test("Test shipFactory returns an array of 5 Ships", () => {
  const ships = shipFactory();
  expect(ships.size).toBe(5);
});

test("Carrier Size is 5", () => {
  const ships = shipFactory();
  const carrier = ships.get("carrier");
  expect(carrier.size).toBe(5);
});
