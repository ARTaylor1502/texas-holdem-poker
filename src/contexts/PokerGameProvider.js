import { PokerGameContext } from './PokerGameContext';
import { useReducer } from 'react';
import { startNewGame, addPlayer, playerFoldHandler, playerCheckHandler, playerBetHandler } from './PokerGame';

const initialPokerGameState = {
  numberOfSeats: 6,
  players: [],
  blinds: {
      small: 25,
      big: 50
  },
  playerPositions: {
      smallBlind: null,
      bigBlind: null,
  },
  currentHand: {
      players: [],
      houseCards: {},
      currentPlayerTurn: null,
      handStage: 0,
      totalPot: 0
  },
}

function reducer(state, action) {
  switch(action.type) {
    case 'addPlayer':
      return addPlayer(state, action);
    case 'startNewGame':
      return startNewGame(state);
    case 'playerBet':
      return playerBetHandler(state, action);
    case 'playerCheck':
        return playerCheckHandler(state, action);
    case 'playerFold':
      return playerFoldHandler(state, action);
    default:
      throw Error('Unknown action.');
  }
}

export function PokerGameProvider({ children }) {
    const [pokerGame, dispatch] = useReducer(reducer, initialPokerGameState);
    
    return (
      <PokerGameContext.Provider value={{
        pokerGame,
        dispatch
      }}>
        {children}
      </PokerGameContext.Provider>
    );
}