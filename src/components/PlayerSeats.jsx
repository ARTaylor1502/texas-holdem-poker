import PlayerSeat from "./PlayerSeat";
import { usePokerGame } from "../contexts/PokerGameContext";
import PlayerActions from "./PlayerActions";

function PlayerSeats() {
  const { pokerGame } = usePokerGame();
  let PlayerSeats = [];

  for (let i = 0; i < pokerGame.numberOfSeats; i++) {
    const player = pokerGame.players.find(player => player.seatNumber === i);
    const playerSeatChildren = player && pokerGame.currentHand.currentPlayerTurn === player.name ? <PlayerActions/> : null;

    PlayerSeats.push(
      <PlayerSeat
        key={i}
        seatNumber={i}
        player={player}
        children={playerSeatChildren}
      />
    )
  }

  return (
    <div id="poker-players-container" className="center-align">
        {PlayerSeats}
    </div>
  );
}

export default PlayerSeats;
