import { useMemo, useState } from "react";
import { usePokerGame } from "../../../contexts/PokerGameContext";
import VacantSeat from "./VacantSeat";
import Cards from "../General/Cards";
import Info from "../General/Info";
import Additional from "../General/Additional";
import SetPlayer from "./SetPlayer";
import Blind from "../General/Blind";
import Selector from "../Avatar/Selector";
import Avatar from "../Avatar/Avatar";

 function Seat(props) {
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
  } else if (isTakenSeat && !props.player.avatar) {
    return <Selector playerId={props.player.name} seatNumber={props.seatNumber} />
  } else if (!isTakenSeat) {
    return <VacantSeat setShowNameInput={setShowNameInput} seatNumber={props.seatNumber}/>;
  }

  return (
    <div
      className={`seat-container seat-position-${props.seatNumber}${props.player && pokerGame.currentHand.currentPlayerTurn === props.player.name ? " player-turn" : ""}`}
    >
      <div className="card-area">
        <Cards isActivePlayer={isActivePlayer} player={props.player} />
        <Blind playerName={props.player.name} />
      </div>
      <Avatar isActive={isActivePlayer} imgSrc={props.player.avatar}/>
      <Info name={props.player.name} chips={props.player.chips} />
      <Additional additional={props.children} />
    </div>
  );
}

export default Seat;
