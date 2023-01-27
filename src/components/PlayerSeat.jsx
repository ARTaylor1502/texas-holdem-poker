import { useState } from "react";

function PlayerSeat(props) {
  const [revealCards, setRevealCards] = useState(false);

  function addPlayer() {
    props.setGamePlayers({ name: props.playerName, chips: 500, hand: [] });
  }

  let seatContent;

  if (props.player.length) {
    seatContent = <img src={props.avatarUrl} alt="Player avatar" />;
  } else {
    seatContent = <span>Take a seat</span>;
  }

  const handleMouseOver = () => {
    setRevealCards(true);
  };

  const handleMouseOut = () => {
    setRevealCards(false);
  };

  return (
    <div className="player-container">
      <div className="card-area">
        <div
          className="player-cards"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {props.player.length &&
            (revealCards
              ? props.player[0].hand.map((card, i) => {
                  return (
                    <img
                      key={`${props.player[0]}.name-card${i}`}
                      className="playing-card"
                      src={card.img_uri}
                      alt="Playing Card"
                    />
                  );
                })
              : props.player[0].hand.map((card, i) => {
                  return (
                    <img
                      key={`${props.player[0]}.name-card${i}`}
                      className="playing-card"
                      src={"assets/images/cards/card-back.svg"}
                      alt="Playing Card"
                    />
                  );
                }))}
        </div>
      </div>
      <div className="seat center-align" onClick={addPlayer}>
        {seatContent}
      </div>
      {props.player.length && (
        <div className="player-info">
          <div className="player-name">{props.player[0].name}</div>
          <div className="player-chips">{props.player[0].chips}</div>
        </div>
      )}
    </div>
  );
}

export default PlayerSeat;
