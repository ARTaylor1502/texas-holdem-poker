import Table from "./Table/Table";
import Seats from "./Table/Seats";
import NewGameButton from "./General/NewGameButton";

function PokerGame() {
  return (
    <div id="poker-room" className="center-align">
      <Seats/>
      <Table/>
      <NewGameButton/>
    </div>
  );
}

export default PokerGame;
