import { useState } from "react";

function PlayerActions(props) {
  const [betAmount, setBetAmount] = useState(0);

  if (!props.player || props.gameStage === 5) {
    return null;
  }

  return (
    <div
      id="player-actions"
      className={`${props.player.name.replace(" ", "-").toLowerCase()}-turn`}
    >
      <div id="actions-container">
        <button onClick={() => props.betHandler(props.player, betAmount)}>
          Bet <br></br>
          {betAmount}
        </button>
        <button onClick={() => props.checkHandler(props.player)}>Check</button>
        <button onClick={() => props.foldHandler(props.player)}>Fold</button>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min={props.minimumAllowedBet}
          max={props.player.chips}
          className="slider"
          onChange={(e) => setBetAmount(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}

export default PlayerActions;
