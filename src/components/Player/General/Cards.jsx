import { useState } from "react";
import { usePokerGame } from "../../../contexts/PokerGameContext";

function Cards({isActivePlayer, player}) {
    const { pokerGame } = usePokerGame();
    const [ revealCards, setRevealCards ] = useState(false);

    if (!player) {
        return null;
    }

    let playerCards;

    if (isActivePlayer) {
      const playerInHand = pokerGame.currentHand.players[pokerGame.currentHand.players.findIndex(p => p.playerId === player.name)];
  
      if (revealCards) {
        playerCards = playerInHand.hand.map((card, i) => {
          return (
            <img
              key={`${playerInHand.playerId}.name-card${i}`}
              className="playing-card"
              src={card.img_uri}
              alt="Playing Card"
            />
          );
        });
      } else {
        playerCards = playerInHand.hand.map((card, i) => {
          return (
            <img
              key={`${playerInHand.playerId}.name-card${i}`}
              className="playing-card"
              src={"assets/images/cards/card-back.svg"}
              alt="Playing Card"
            />
          );
        });
      }
    };

    const handleMouseOver = () => {
        setRevealCards(true);
    };

    const handleMouseOut = () => {
        setRevealCards(false);
    };

    return (
        <div
            className="player-cards"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {playerCards}
        </div>
    );
  }
  
  export default Cards;
  