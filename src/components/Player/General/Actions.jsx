import { useMemo, useState } from "react";
import { usePokerGame } from "../../../contexts/PokerGameContext";
import { handStages } from '../../../contexts/PokerGame'
import ActionButton from "./ActionButton";

function Actions() {
  const { pokerGame } = usePokerGame();
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
  const activePlayerCommittedChips = 
    pokerGame.currentHand.playerActions[handStages[pokerGame.currentHand.handStage]]
    .filter(action => action.playerId === activePlayer.name)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.betAmount
    },0);

  const callAmount = pokerGame.currentHand.handStageMinimumBet - activePlayerCommittedChips;

  return (
    <div
      id="player-actions"
      className={`${activePlayer.seatNumber}-turn`}
    >
      <div id="actions-container">
        {callAmount > 0 &&
          <ActionButton 
            className="call-btn" 
            dispatchObj={{type: 'playerBet', player: activePlayer, bet: callAmount, handStage: pokerGame.currentHand.handStage}}
            children={<span>Call</span>}/>
        }
        <ActionButton 
          className="raise-btn"
          dispatchObj={{type: 'playerBet', player: activePlayer, bet: betAmount, handStage: pokerGame.currentHand.handStage}}
          children={<span>Raise <br></br>{betAmount}</span>}/>
        {!checkDisabled > 0 &&
          <ActionButton 
            className="check-btn"
            dispatchObj={{type: 'playerCheck', player: activePlayer, bet: 0, handStage: pokerGame.currentHand.handStage}}
            children={<span>Check</span>}/>
        }
        <ActionButton 
          className="fold-btn"
          dispatchObj={{type: 'playerFold', player: activePlayer, bet: 0, handStage: pokerGame.currentHand.handStage}}
          children={<span>Fold</span>}/>
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