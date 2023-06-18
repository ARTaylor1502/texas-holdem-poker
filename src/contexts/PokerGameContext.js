import { createContext, useContext } from 'react';

export const PokerGameContext = createContext(null);

export function usePokerGame() {
    return useContext(PokerGameContext);
};