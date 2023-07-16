import { PokerGameContext } from './PokerGameContext';
import { useReducer } from 'react';
import { 
  initialPokerGameState,
  startNewGame, 
  addPlayer,
  updatePlayer,
  playerFoldHandler, 
  playerCheckHandler, 
  playerBetHandler 
} from './PokerGame';

function reducer(state, action) {
  switch(action.type) {
    case 'addPlayer':
      return addPlayer(state, action);
    case 'updatePlayer':
        return updatePlayer(state, action);
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