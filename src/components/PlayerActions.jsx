import { useMemo, useState } from "react";
import { usePokerGame } from "../contexts/PokerGameContext";

function PlayerActions() {
  const { pokerGame, getPlayer, betHandler, updatePlayerTurn, foldHandler } = usePokerGame();
  const [ betAmount, setBetAmount ] = useState(0);
  const activePlayer = useMemo(() => getPlayer(pokerGame.currentHand.currentPlayerTurn), [pokerGame.currentHand.currentPlayerTurn, getPlayer]);

  if (!activePlayer || pokerGame.currentHand.handStage === 5) {
    return null;
  }

  return (
    <div
      id="player-actions"
      className={`${activePlayer.seatNumber}-turn`}
    >
      <div id="actions-container">
        <button className="bet-btn" onClick={() => betHandler(activePlayer, betAmount)}>
          Bet <br></br>
          {betAmount}
        </button>
        <button className="check-btn" onClick={() => updatePlayerTurn(activePlayer)}>Check</button>
        <button className="fold-btn" onClick={() => foldHandler(activePlayer)}>Fold</button>
      </div>
      <div className="slider-container">
        <input
          type="range"
          //TODO Make dynamic minimum bet amount
          min={0}
          max={activePlayer.chips}
          className="slider"
          onChange={(e) => setBetAmount(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}

export default PlayerActions;
