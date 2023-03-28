import { expect, test } from "@jest/globals";
import { calculateHighestHand } from "./cards.js";
import {
  royalFlushHand,
  straightFlushHand,
  fourOfAKindHand,
  fullHouseHand,
  flushHand,
  straightHand,
  threeOfAKindHand,
  twoPairHand,
  pairHand,
  highCardHand,
} from "./cards-test-data.js";

describe("Calculate winners", () => {
  test("Royal flush winner", () => {
    expect(calculateHighestHand(royalFlushHand)).toStrictEqual({
      hand_name: "Royal Flush",
      hand_rank: 1,
    });
  });

  test("Straight flush winner", () => {
    expect(calculateHighestHand(straightFlushHand)).toStrictEqual({
      hand_name: "Straight Flush",
      hand_rank: 2,
    });
  });

  test("Four of a kind winner", () => {
    expect(calculateHighestHand(fourOfAKindHand)).toStrictEqual({
      hand_name: "Four of a Kind",
      hand_rank: 3,
    });
  });

  test("Full House winner", () => {
    expect(calculateHighestHand(fullHouseHand)).toStrictEqual({
      hand_name: "Full House",
      hand_rank: 4,
    });
  });

  test("Flush winner", () => {
    expect(calculateHighestHand(flushHand)).toStrictEqual({
      hand_name: "Flush",
      hand_rank: 5,
    });
  });

  test("Straight winner", () => {
    expect(calculateHighestHand(straightHand)).toStrictEqual({
      hand_name: "Straight",
      hand_rank: 6,
    });
  });

  test("Three of a kind winner", () => {
    expect(calculateHighestHand(threeOfAKindHand)).toStrictEqual({
      hand_name: "Three of a Kind",
      hand_rank: 7,
    });
  });

  test("Two pair winner", () => {
    expect(calculateHighestHand(twoPairHand)).toStrictEqual({
      hand_name: "Two Pair",
      hand_rank: 8,
    });
  });

  test("Pair winner", () => {
    expect(calculateHighestHand(pairHand)).toStrictEqual({
      hand_name: "Pair",
      hand_rank: 9,
    });
  });

  test("High card winner", () => {
    expect(calculateHighestHand(highCardHand)).toStrictEqual({
      hand_name: "High Card",
      hand_rank: 10,
    });
  });
});
