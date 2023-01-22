import PlayerSeat from "./PlayerSeat";

function PokerGame() {
  return (
    <div id="poker-room" className="center-align">
      <div id="player2-area" className="player-area center-align">
        <PlayerSeat
          playerName="Player Two"
          avatarUrl="assets/images/avatars/man.svg"
        />
      </div>
      <div id="poker-table"></div>
      <div id="player1-area" className="player-area center-align">
        <PlayerSeat
          playerName="Player One"
          avatarUrl="assets/images/avatars/lady.svg"
        />
      </div>
    </div>
  );
}

export default PokerGame;
