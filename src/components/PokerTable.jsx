import { usePokerGame } from "../contexts/PokerGameContext";
import HouseCards from "./HouseCards";

function PokerTable() {
  const { pokerGame } = usePokerGame();

  return (
    <div id="poker-table" className="center-align">
      {pokerGame.currentHand.handStage > 0 && (
        <div id="table-center">
          <HouseCards />
          <div id="total-pot" className="center-align ml-auto">
            <span>Pot Total: {pokerGame.currentHand.totalPot}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokerTable;
