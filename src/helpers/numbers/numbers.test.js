import { expect, test } from "@jest/globals";
import { mapSequentialNumbers } from "./numbers.js";

describe("Map sequential numbers", () => {
  test("One full straight sequence", () => {
    expect(mapSequentialNumbers([2, 3, 4, 6, 7, 1, 5])).toStrictEqual([
      [1, 2, 3, 4, 5, 6, 7],
    ]);
  });

  test("Two sequences", () => {
    expect(
      mapSequentialNumbers([7, 2, 11, 3, 5, 6, 10, 12, 8, 9])
    ).toStrictEqual([
      [2, 3],
      [5, 6, 7, 8, 9, 10, 11, 12],
    ]);
  });

  test("Five sequences", () => {
    expect(
      mapSequentialNumbers([7, 2, 11, 3, 5, 6, 10, 12, 32, 33, 99, 100]).length
    ).toBe(5);
  });

  test("No sequences", () => {
    expect(mapSequentialNumbers([1, 5, 11, 27, 45, 32, 99]).length).toBe(7);
  });
});
