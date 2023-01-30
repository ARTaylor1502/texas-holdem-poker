import { useState } from "react";

function PlayerSeat(props) {
  const [revealCards, setRevealCards] = useState(false);

  function addPlayer() {
    props.setTablePlayer({ name: props.playerName, chips: 500, hand: [] });
  }

  let blindButton;

  if (props.player.length) {
    if (props.bigBlind.player === props.player[0]) {
      blindButton = <div className="button big-blind">Big Blind</div>;
    } else if (props.smallBlind.player === props.player[0]) {
      blindButton = <div className="button small-blind">Small Blind</div>;
    }
  }

  const handleMouseOver = () => {
    setRevealCards(true);
  };

  const handleMouseOut = () => {
    setRevealCards(false);
  };

  return (
    <div
      className={`player-container${props.playerTurn ? " player-turn" : ""}`}
    >
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
        {blindButton}
      </div>

      {!props.player.length ? (
        <div className="seat center-align" onClick={addPlayer}>
          <span>Take a seat</span>
        </div>
      ) : (
        <div
          className={`seat taken-seat center-align ${
            props.activePlayer ? "active" : "inactive"
          }`}
        >
          <img src={props.avatarUrl} alt="Player avatar" />
        </div>
      )}

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
