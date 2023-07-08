import Seat from "../Player/Seat/Seat";
import { usePokerGame } from "../../contexts/PokerGameContext";
import Actions from "../Player/General/Actions";

function Seats() {
  const { pokerGame } = usePokerGame();
  let seats = [];

  for (let i = 0; i < pokerGame.numberOfSeats; i++) {
    const player = pokerGame.players.find(player => player.seatNumber === i);
    const playerSeatChildren = player && pokerGame.currentHand.currentPlayerTurn === player.name ? <Actions/> : null;

    seats.push(
      <Seat
        key={i}
        seatNumber={i}
        player={player}
        children={playerSeatChildren}
      />
    )
  }

  return (
    <div id="poker-players-container" className="center-align">
        {seats}
    </div>
  );
}

export default Seats;
