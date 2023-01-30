const suits = ["club", "heart", "spade", "diamond"];

export function dealCard() {
  const cardSuit = suits[Math.floor(Math.random() * suits.length)];
  const cardNumber = Math.floor(Math.random() * 13) + 1;
  const imgUri = `assets/images/cards/${cardSuit}${cardNumber}.svg`;
  const cardValue = cardNumber > 10 ? 10 : cardNumber;

  return {
    suit: cardSuit,
    number: cardNumber,
    img_uri: imgUri,
    value: cardValue,
  };
}

export function isFlush(array) {
  return array.every((suit) => suit === array[0]);
}

export function isStraight(array) {
  const sortedArray = array.sort();

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray.length[i] - sortedArray.length[i - 1] !== 1) {
      return false;
    }
  }

  return true;
}

export function tallyValueOccurances(array) {
  const occuranceTally = {};

  array.forEach((value) => {
    occuranceTally[value] = (occuranceTally[value] || 0) + 1;
  });

  return occuranceTally;
}

export function calculateHighestHand(suits, values) {
  let highestHand;

  const flushHand = isFlush(suits);
  const fourOfAKind = Object.values(tallyValueOccurances(values)).includes(4);
  const fullHouse =
    Object.values(tallyValueOccurances(values)).includes(3) &&
    Object.values(tallyValueOccurances(values)).includes(2);
  const threeOfAKind = Object.values(tallyValueOccurances(values)).includes(3);
  const twoPair = "";
  const pair = Object.values(tallyValueOccurances(values)).includes(2);

  switch (true) {
    // royal flush - 10,j,q,k,a all in same suit
    case flushHand && values.sort === [1, 10, 11, 12, 13]:
      highestHand = {
        hand_name: "Royal Flush",
        hand_rank: 1,
      };
      break;
    // straight flush - any consecutive string of cards of the same suit
    case flushHand && isStraight(values):
      highestHand = {
        hand_name: "Straight Flush",
        hand_rank: 2,
      };
      break;
    //4 of a kind
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
    case isStraight(values):
      highestHand = {
        hand_name: "Straight",
        hand_rank: 5,
      };
      break;
    case threeOfAKind:
      highestHand = {
        hand_name: "Three of a Kind",
        hand_rank: 6,
      };
      break;
    case twoPair:
      highestHand = {
        hand_name: "Two Pair",
        hand_rank: 7,
      };
      break;
    case pair:
      highestHand = {
        hand_name: "Pair",
        hand_rank: 8,
      };
      break;
    default:
      highestHand = {
        hand_name: "High Card",
        hand_rank: 9,
      };
      break;
  }

  return highestHand;
}
