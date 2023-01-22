import { useState } from "react";

function PlayerSeat(props) {
  const [name, setName] = useState("");

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
    <div className="seat center-align" onClick={addPlayer}>
      {seatContent}
    </div>
  );
}

export default PlayerSeat;
