import { useMemo, useState } from "react";
import { usePokerGame } from "../contexts/PokerGameContext";

 function PlayerSeat(props) {
  const { pokerGame, dispatch } = usePokerGame();
  const [ revealCards, setRevealCards ] = useState(false);
  const [ playerName, setPlayerName ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ showNameInput, setShowNameInput ] = useState(false);

  function addPlayer() {
    if (!pokerGame.players.find(p => p.name === playerName)) {
      dispatch({type: 'addPlayer', name: playerName, seatNumber: props.seatNumber})
      setShowNameInput(false);
    } else {
      setErrorMessage('Player name already registered');
    }
  }

  const isEmptySeat = !props.player;

  let blindButton;

  if (props.player) {
    if (pokerGame.playerPositions.bigBlind === props.player.name) {
      blindButton = <div className="button big-blind">Big Blind</div>;
    } else if (pokerGame.playerPositions.smallBlind === props.player.name) {
      blindButton = <div className="button small-blind">Small Blind</div>;
    }
  }
  
  const isActivePlayer = useMemo(() => 
    props.player && 
    pokerGame.currentHand.players && 
    pokerGame.currentHand.players.findIndex(p => p.playerId === props.player.name) > -1,
    [pokerGame.currentHand.players, props.player]
  );

  let playerCards;

  if (!isEmptySeat && isActivePlayer) {
    const playerInHand = pokerGame.currentHand.players[pokerGame.currentHand.players.findIndex(p => p.playerId === props.player.name)];

    if (revealCards) {
      playerCards = playerInHand.hand.map((card, i) => {
        return (
          <img
            key={`${playerInHand.playerId}.name-card${i}`}
            className="playing-card"
            src={card.img_uri}
            alt="Playing Card"
          />
        );
      });
    } else {
      playerCards = playerInHand.hand.map((card, i) => {
        return (
          <img
            key={`${playerInHand.playerId}.name-card${i}`}
            className="playing-card"
            src={"assets/images/cards/card-back.svg"}
            alt="Playing Card"
          />
        );
      });
    }
  };

  let playerSeat; 

  if (!isEmptySeat) {
    playerSeat = (
      <div
        className={`seat taken-seat center-align ${
          isActivePlayer ? "active" : "inactive"
        }`}>
        <img src={props.player.avatar} alt="Player avatar" />
      </div>
    )
  } else if (showNameInput) {
    playerSeat = (
      <div className="seat center-align">
        <div className="player-name-container">
          {errorMessage && (<div className="error-message">{errorMessage}</div>)}
          <label>Please enter your name:</label>
          <div className="player-name-selection">
            <input onChange={(e) => setPlayerName(e.currentTarget.value)}/>
            <button onClick={addPlayer}>Confirm?</button>
          </div>
        </div>
      </div>
    )
  } else {
    playerSeat = (
      <div className="seat center-align" onClick={() => setShowNameInput(true)}>
        <span>Take a seat</span>
      </div>
    )
  }

  const handleMouseOver = () => {
    setRevealCards(true);
  };

  const handleMouseOut = () => {
    setRevealCards(false);
  };

  return (
    <div
      className={`player-container player-position-${props.seatNumber}${props.player && pokerGame.currentHand.currentPlayerTurn === props.player.name ? " player-turn" : ""}`}
    >
      <div className="card-area">
        <div
          className="player-cards"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {playerCards}
        </div>
        {blindButton}
      </div>

      {playerSeat}

      {!isEmptySeat && (
        <div className="player-info">
          <div className="player-name">{props.player.name}</div>
          <div className="player-chips">{props.player.chips}</div>
        </div>
      )}

      {props.children && (
        <div className="player-additional">{props.children}</div>
      )}
    </div>
  );
}

export default PlayerSeat;
