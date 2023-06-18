import { useState } from 'react';
import { PokerGameContext } from './PokerGameContext';
import { calculateHighestHand, dealCard } from "../helpers/cards/cards";

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

export function PokerGameProvider({ children }) {
    const [pokerGame, setPokerGame] = useState(initialPokerGameState);
  
    function getPlayer(playerId) {
      return pokerGame.players.find((player) => {
        return player.name === playerId;
      });
    }
    
    function startNewGame() {
      const playersInHand = pokerGame.players.map((player) => {
        let playerCards = [];
        for (let i = 0; i <= 1; i++) {
          playerCards.push(dealCard());
        }

        return {
          playerId: player.name,
          hand: playerCards
        }
      });
    
      let currentHand = pokerGame.currentHand;
      currentHand.handStage = 1;
      currentHand.houseCards = dealFlop();
      currentHand.players = playersInHand;
      currentHand.currentPlayerTurn = currentHand.players[0].playerId;

      updateBlinds();
      setPokerGame({ ...pokerGame, currentHand});
    }
    
    function updateGameStage() {
      let {currentHand} = pokerGame;
    
      currentHand.handStage++;

      if (currentHand.handStage === 3) {
        currentHand.houseCards.turnCard = dealCard();
      } else if (currentHand.handStage === 4) {
        currentHand.houseCards.riverCard = dealCard();
      }
      setPokerGame({...pokerGame, currentHand});
    }
    
    function dealFlop() {
      return {
        flopCard1: dealCard(),
        flopCard2: dealCard(),
        flopCard3: dealCard(),
        turnCard: null,
        riverCard: null,
      };
    }
    
    function betHandler(player, betAmount) {
      let {currentHand} = pokerGame;

      //Add chips to pot and deduct from player
      currentHand.totalPot += parseInt(betAmount);
      player.chips -= betAmount;
      const players = [...pokerGame.players, player];

      setPokerGame({ ...pokerGame, currentHand, players});
      
      //TODO: account for raises/reraises
      updatePlayerTurn();
    }
    
    function foldHandler(player) {
      updatePlayerTurn();
      const {currentHand} = pokerGame;
    
      const index = currentHand.players.indexOf(player.playerId);
      if (index > -1) {
        currentHand.players.splice(index, 1);
      }
    
      setPokerGame({ ...pokerGame, currentHand: { currentHand }});

      const activePlayersInHand = pokerGame.currentHand.players.filter(player => player.active)
    
      if (activePlayersInHand.length < 2) {
        foldEndGame();
      }
    }
    
    function updateBlinds() {
      const { playerPositions, players, blinds, currentHand } = pokerGame;

      const blindsSet = playerPositions.smallBlind && playerPositions.bigBlind;

      //update positions of blinds
      if (blindsSet) {
        const previousSmallBlindIndex = players.findIndex((p) => {
          return p.name === playerPositions.smallBlind;
        });
        const previousBigBlindIndex = players.findIndex((p) => {
          return p.name === playerPositions.bigBlind;
        });

        if ((previousBigBlindIndex + 1) < (players.length + 1)) {
          playerPositions.bigBlind = players[previousBigBlindIndex + 1].name;
        } else {
          playerPositions.bigBlind = players[0].name;
        }

        if ((previousSmallBlindIndex + 1) < (players.length + 1)) {
          playerPositions.smallBlind = players[previousSmallBlindIndex + 1].name;
        } else {
          playerPositions.smallBlind = players[0].name;
        }
      } else {
        playerPositions.smallBlind = players[0].name;
        playerPositions.bigBlind = players[1].name;
      }

      //subtract blind amounts from players
      let smallBlindPlayerIndex = players.findIndex((p) => {
        return p.name === playerPositions.smallBlind;
      });
      players[smallBlindPlayerIndex].chips -= blinds.small;

      let bigBlindPlayerIndex = players.findIndex((p) => {
        return p.name === playerPositions.bigBlind;
      });
      players[bigBlindPlayerIndex].chips -= blinds.big;

      //add subtracted blinds to the hand pot
      currentHand.totalPot = blinds.small + blinds.big;

      setPokerGame({ ...pokerGame, currentHand, players});
    }
    
    function foldEndGame() {
      const {currentHand} = pokerGame;

      const winningPlayer = getPlayer(currentHand.players[0]);
      winningPlayer.chips += currentHand.totalPot;

      const players = [...pokerGame.players, winningPlayer];

      currentHand.handStage = 5;

      setPokerGame({ ...pokerGame, players: players , currentHand: { currentHand }});
    }
    
   function calculateWinner() {
      const {currentHand} = pokerGame;

      let finalHands = {
        house: calculateHighestHand(Object.values(currentHand.houseCards)),
      };
    
      //loop through all players in hand
      for (let i = 0; i < currentHand.players.length; i++) {
        let playerName = currentHand.players[i].playerId;
        const playerhouseCombinedHand = currentHand.players[i].hand.concat(Object.values(currentHand.houseCards));
        finalHands[playerName] = calculateHighestHand(playerhouseCombinedHand);
      }
    
      //calculate which player has the strongest hand 
      const winningPlayer = Object.keys(finalHands).reduce((previousPlayer, currentPlayer) => {
        return finalHands[currentPlayer].hand_rank < finalHands[previousPlayer].hand_rank ? currentPlayer : previousPlayer;
      });
    
      currentHand.handStage++;
      setPokerGame({ ...pokerGame, currentHand});
      console.log(`Winning player is ${winningPlayer}`);
    }
    
    function updatePlayerTurn() {
      const {currentHand} = pokerGame;

      const currentPlayerIndex = currentHand.players.findIndex(p => p.playerId === currentHand.currentPlayerTurn);
      let nextPlayerIndex = currentPlayerIndex + 1;  
      if (nextPlayerIndex > (currentHand.players.length - 1)) {
        nextPlayerIndex = 0;
      }
    
      if (nextPlayerIndex) {
        currentHand.currentPlayerTurn = currentHand.players[nextPlayerIndex].playerId;
        setPokerGame({ ...pokerGame, currentHand});
      } else {
        if (currentHand.handStage < 4) {
          currentHand.currentPlayerTurn = currentHand.players[nextPlayerIndex].playerId;
          setPokerGame({ ...pokerGame, currentHand});
          updateGameStage();
        } else {
          calculateWinner();
        }
      }
   }

    return (
      <PokerGameContext.Provider value={{
        pokerGame,
        getPlayer,
        setPokerGame,
        startNewGame,
        updateGameStage,
        betHandler,
        updatePlayerTurn,
        foldHandler
      }}>
        {children}
      </PokerGameContext.Provider>
    );
}