import { useState } from "react";

function PlayerSeat(props) {
  const [name, setName] = useState("");
  const [chipsCount, setChipsCount] = useState(500);

  function addPlayer() {
    setName(props.playerName);
  }

  let seatContent;

  if (name !== "") {
    seatContent = <img src={props.avatarUrl} alt="Player avatar" />;
  } else {
    seatContent = <span>Take a seat</span>;
  }

  return (
    <div className="player-container">
      <div className="seat center-align" onClick={addPlayer}>
        {seatContent}
      </div>
      {name !== "" && (
        <div className="player-info">
          <div className="player-name">{name}</div>
          <div className="player-chips">{chipsCount}</div>
        </div>
      )}
    </div>
  );
}

export default PlayerSeat;
