import { useMemo, useState } from "react";
import { usePokerGame } from "../contexts/PokerGameContext";

function PlayerActions() {
  const { pokerGame, dispatch } = usePokerGame();
  const [ betAmount, setBetAmount ] = useState(0);
  const activePlayer = useMemo(() => 
    pokerGame.players.find((player) => player.name === pokerGame.currentHand.currentPlayerTurn),
    [pokerGame.currentHand.currentPlayerTurn, pokerGame.players]
  );

  if (!activePlayer || pokerGame.currentHand.handStage === 5) {
    return null;
  }

  return (
    <div
      id="player-actions"
      className={`${activePlayer.seatNumber}-turn`}
    >
      <div id="actions-container">
        <button className="bet-btn" onClick={() => dispatch({type: 'playerBet', player: activePlayer, bet: betAmount})}>
          Bet <br></br>
          {betAmount}
        </button>
        <button className="check-btn" onClick={() => dispatch({type: 'playerCheck'})}>Check</button>
        <button className="fold-btn" onClick={() => dispatch({type: 'playerFold', player: activePlayer})}>Fold</button>
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
