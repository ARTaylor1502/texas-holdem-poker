import { useMemo } from "react";
import { usePokerGame } from "../../contexts/PokerGameContext";

function CommunityCards() {
  const { pokerGame } = usePokerGame();

  const activeCards = Object.values(pokerGame.currentHand.communityCards).filter((value) => value !== null);
  
  const tableCards = useMemo(() => Object.entries(activeCards).map(([key, value]) => {
    return (
      <img
        key={`community-card${key}`}
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
    <div className="community-cards-container">{tableCards}</div>
  );
}

export default CommunityCards;
