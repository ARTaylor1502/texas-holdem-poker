import { useState } from "react";
import { usePokerGame } from "../../../contexts/PokerGameContext";

function SetPlayer({setShowNameInput, seatNumber}) {
  const { pokerGame, dispatch } = usePokerGame();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ playerName, setPlayerName ] = useState('');

  function addPlayer() {
    if (!pokerGame.players.find(p => p.name === playerName)) {
      dispatch({type: 'addPlayer', avatar: null, name: playerName, seatNumber: seatNumber})
      setShowNameInput(false);
    } else {
      setErrorMessage('Player name already registered');
    }
  }

  return (
    <div className={`seat-container seat-position-${seatNumber}`}>
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
    </div>
  );
}
  
export default SetPlayer;
  