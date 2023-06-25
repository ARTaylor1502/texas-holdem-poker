import { useMemo, useState } from "react";
import { usePokerGame } from "../../contexts/PokerGameContext";
import PlayerAvatar from "./PlayerAvatar";
import VacantSeat from "./VacantSeat";
import PlayerCards from "./PlayerCards";
import PlayerInfo from "./PlayerInfo";
import PlayerAdditional from "./PlayerAdditional";
import SetPlayer from "./SetPlayer";
import PlayerBlind from "./PlayerBlind";

 function PlayerSeat(props) {
  const { pokerGame } = usePokerGame();
  const [ showNameInput, setShowNameInput ] = useState(false);

  const isTakenSeat = props.player;
  
  const isActivePlayer = useMemo(() => 
    props.player && 
    pokerGame.currentHand.players && 
    pokerGame.currentHand.players.findIndex(p => p.playerId === props.player.name) > -1,
    [pokerGame.currentHand.players, props.player]
  );

  if (showNameInput) {
    return <SetPlayer setShowNameInput={setShowNameInput} seatNumber={props.seatNumber} />;
  } else if (!isTakenSeat) {
    return <VacantSeat setShowNameInput={setShowNameInput} seatNumber={props.seatNumber}/>;
  }

  return (
    <div
      className={`seat-container seat-position-${props.seatNumber}${props.player && pokerGame.currentHand.currentPlayerTurn === props.player.name ? " player-turn" : ""}`}
    >
      <div className="card-area">
        <PlayerCards isActivePlayer={isActivePlayer} player={props.player} />
        <PlayerBlind playerName={props.player.name} />
      </div>
      <PlayerAvatar isActivePlayer={isActivePlayer} playerAvatar={props.player.avatar}/>
      <PlayerInfo player={props.player}/>
      <PlayerAdditional additional={props.children} />
    </div>
  );
}

export default PlayerSeat;
