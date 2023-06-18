import PokerTable from "./PokerTable";
import PlayerSeats from "./PlayerSeats";
import NewGameButton from "./NewGameButton";

function PokerGame() {
  return (
    <div id="poker-room" className="center-align">
      <PlayerSeats/>
      <PokerTable/>
      <NewGameButton/>
    </div>
  );
}

export default PokerGame;
