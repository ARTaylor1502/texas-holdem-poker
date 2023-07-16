import { useMemo, useState } from "react";
import { usePokerGame } from "../../../contexts/PokerGameContext";

function Actions() {
  const { pokerGame, dispatch } = usePokerGame();
  const [ betAmount, setBetAmount ] = useState(pokerGame.currentHand.handStageMinimumBet);
  const { handStageMinimumBet: minBet } = pokerGame.currentHand;

  const activePlayer = useMemo(() => 
    pokerGame.players.find((player) => player.name === pokerGame.currentHand.currentPlayerTurn),
    [pokerGame.currentHand.currentPlayerTurn, pokerGame.players]
  );

  if (!activePlayer || pokerGame.currentHand.handStage === 5) {
    return null;
  }

  const playerIsBigBlind = pokerGame.playerPositions.bigBlind === activePlayer.name;
  const checkDisabled = (minBet > pokerGame.playerPositions.bigBlind && playerIsBigBlind) || (minBet > 0 && !playerIsBigBlind);

  return (
    <div
      id="player-actions"
      className={`${activePlayer.seatNumber}-turn`}
    >
      <div id="actions-container">
        <button className="bet-btn" onClick={() => dispatch({type: 'playerBet', player: activePlayer, bet: betAmount, handStage: pokerGame.currentHand.handStage})}>
          Bet <br></br>
          {betAmount}
        </button>
        <button className="check-btn" onClick={() => dispatch({type: 'playerCheck', player: activePlayer, bet: 0, handStage: pokerGame.currentHand.handStage})} disabled={checkDisabled}>Check</button>
        <button className="fold-btn" onClick={() => dispatch({type: 'playerFold', player: activePlayer, bet: 0, handStage: pokerGame.currentHand.handStage})}>Fold</button>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min={minBet}
          max={activePlayer.chips}
          className="slider"
          onChange={(e) => setBetAmount(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}

export default Actions;