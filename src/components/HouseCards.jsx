import { useMemo } from "react";
import { usePokerGame } from "../contexts/PokerGameContext";

function HouseCards() {
  const { pokerGame } = usePokerGame();

  const activeCards = Object.values(pokerGame.currentHand.houseCards).filter((value) => value !== null);
  
  const tableCards = useMemo(() => Object.entries(activeCards).map(([key, value]) => {
    return (
      <img
        key={`house-card${key}`}
        className="playing-card"
        src={
          pokerGame.currentHand.handStage > 1
            ? value.img_uri
            : "assets/images/cards/card-back.svg"
        }
        alt="Playing Card"
      />
    );
  }), [activeCards, pokerGame.currentHand.handStage]);

  return (
    <div className="house-cards-container">{tableCards}</div>
  );
}

export default HouseCards;
