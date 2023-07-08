import { usePokerGame } from "../../../contexts/PokerGameContext";

function Blind({playerName}) {
    const { pokerGame } = usePokerGame();

    let blindButton;

    if (pokerGame.playerPositions.bigBlind === playerName) {
        blindButton = <div className="button big-blind">Big Blind</div>;
    } else if (pokerGame.playerPositions.smallBlind === playerName) {
        blindButton = <div className="button small-blind">Small Blind</div>;
    }

    return blindButton;
}
  
export default Blind;
  