import { usePokerGame } from "../contexts/PokerGameContext";

function NewGameButton() {
  const {pokerGame, startNewGame} = usePokerGame();
  const gameInProgress = pokerGame.currentHand.handStage > 0 && pokerGame.currentHand.handStage < 5;

  if (pokerGame.players.length < 2 || (gameInProgress)) {
    return null;
  }

  return (
    <button id="new-game-btn" onClick={startNewGame}>
      New Game
    </button>
  );
}

export default NewGameButton;
