const suits = ["club", "heart", "spade", "diamond"];

export function dealCard() {
  const cardClub = suits[Math.floor(Math.random() * suits.length)];
  const cardNumber = Math.floor(Math.random() * 13) + 1;
  const imgUri = `assets/images/cards/${cardClub}${cardNumber}.svg`;
  const cardValue = cardNumber > 10 ? 10 : cardNumber;

  return {
    club: cardClub,
    number: cardNumber,
    img_uri: imgUri,
    value: cardValue,
  };
}
