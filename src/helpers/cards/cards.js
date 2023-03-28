import { mapSequentialNumbers } from "../numbers/numbers";

const suits = ["club", "heart", "spade", "diamond"];

export function dealCard() {
  const cardSuit = suits[Math.floor(Math.random() * suits.length)];
  const cardNumber = Math.floor(Math.random() * 13) + 1;
  const imgUri = `assets/images/cards/${cardSuit}${cardNumber}.svg`;
  const cardValue = cardNumber === 1 ? [1, 14] : cardNumber;

  return {
    suit: cardSuit,
    number: cardNumber,
    img_uri: imgUri,
    value: cardValue,
  };
}

export function tallyCardOccurances(cards) {
  const cardsTally = {
    suits: {},
    numbers: {},
  };

  cards.forEach((card) => {
    if (card.suit in cardsTally.suits) {
      cardsTally.suits[card.suit].push(card);
    } else {
      cardsTally.suits[card.suit] = [card];
    }

    if (card.number in cardsTally.numbers) {
      cardsTally.numbers[card.number].push(card);
    } else {
      cardsTally.numbers[card.number] = [card];
    }
  });

  return cardsTally;
}

export function mapCardValues(cards) {
  let mappedValues = [];

  for (let i = 0; i < cards.length; i++) {
    mappedValues.push(cards[i].value);

    const isAce = cards[i].value === 14;
    if (isAce) {
      mappedValues.push(1);
    }
  }

  return mappedValues;
}

export function calculateHighestHand(cards) {
  let highestHand;

  const cardsTally = tallyCardOccurances(cards);
  const numberTally = Object.values(cardsTally.numbers).map(
    (number) => number.length
  );

  //Flush Hands
  const highestFlushHandSuit = Object.keys(cardsTally.suits).reduce((a, b) =>
    cardsTally.suits[a].length > cardsTally.suits[b].length ? a : b
  );
  const flush = cardsTally.suits[highestFlushHandSuit].length >= 5;
  const flushCards = cardsTally.suits[highestFlushHandSuit];
  const flushCardValues = mapCardValues(flushCards);
  const flushStraightValues = mapSequentialNumbers(flushCardValues);
  const flushSequenceLengths = flushStraightValues.map(
    (sequence) => sequence.length
  );
  const highestFlushSequenceIndex = flushSequenceLengths.indexOf(
    Math.max(...flushSequenceLengths)
  );
  const royalFlush =
    flushStraightValues[highestFlushSequenceIndex].toString() ===
    [10, 11, 12, 13, 14].toString();
  const straightFlush =
    flushStraightValues[highestFlushSequenceIndex].length >= 5;

  //Card Sequences
  const cardValues = [];
  for (let i = 0; i < cards.length; i++) {
    cardValues.push(cards[i].value);

    const isAce = cards[i].value === 14;
    if (isAce) {
      cardValues.push(1);
    }
  }
  const numberSequences = mapSequentialNumbers(cardValues);
  const highestSequence = Math.max(
    ...numberSequences.map((sequence) => sequence.length)
  );
  const isStraight = highestSequence >= 5;

  //Multiple Card Hands
  const highestCardInstanceNumber = Object.keys(cardsTally.numbers).reduce(
    (a, b) =>
      cardsTally.numbers[a].length > cardsTally.numbers[b].length ? a : b
  );
  const fourOfAKind = cardsTally.numbers[highestCardInstanceNumber].length >= 4;
  const fullHouse = numberTally.includes(3) && numberTally.includes(2);
  const threeOfAKind =
    cardsTally.numbers[highestCardInstanceNumber].length === 3;
  const twoPair = numberTally.filter((number) => number === 2).length === 2;
  const pair = numberTally.includes(2);

  switch (true) {
    case royalFlush:
      highestHand = {
        hand_name: "Royal Flush",
        hand_rank: 1,
      };
      break;
    case straightFlush:
      highestHand = {
        hand_name: "Straight Flush",
        hand_rank: 2,
      };
      break;
    case fourOfAKind:
      highestHand = {
        hand_name: "Four of a Kind",
        hand_rank: 3,
      };
      break;
    case fullHouse:
      highestHand = {
        hand_name: "Full House",
        hand_rank: 4,
      };
      break;
    case flush:
      highestHand = {
        hand_name: "Flush",
        hand_rank: 5,
      };
      break;
    case isStraight:
      highestHand = {
        hand_name: "Straight",
        hand_rank: 6,
      };
      break;
    case threeOfAKind:
      highestHand = {
        hand_name: "Three of a Kind",
        hand_rank: 7,
      };
      break;
    case twoPair:
      highestHand = {
        hand_name: "Two Pair",
        hand_rank: 8,
      };
      break;
    case pair:
      highestHand = {
        hand_name: "Pair",
        hand_rank: 9,
      };
      break;
    default:
      highestHand = {
        hand_name: "High Card",
        hand_rank: 10,
      };
      break;
  }

  return highestHand;
}
