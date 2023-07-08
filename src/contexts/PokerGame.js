import { calculateHighestHand, dealCard } from "../helpers/cards/cards";

const handStages = {
    preGame: 0,
    preFlop: 1,
    flop: 2,
    turn: 3,
    river: 4,
    endGame: 5
}
  
const dealFlop = () => {
    return {
        flopCard1: dealCard(),
        flopCard2: dealCard(),
        flopCard3: dealCard(),
        turnCard: null,
        riverCard: null,
    };
}

const progressToNextHandStage = (hand) => {
    if (hand.handStage === handStages['turn']) {
        hand.communityCards.turnCard = dealCard();
    } else if (hand.handStage === handStages['river']) {
        hand.communityCards.riverCard = dealCard();
    }

    return hand;
};

const calculateWinner = (currentHand) => {
    let finalHands = {
        house: calculateHighestHand(Object.values(currentHand.communityCards)),
    };

    //calculate all players highest hands
    for (let i = 0; i < currentHand.players.length; i++) {
        let playerName = currentHand.players[i].playerId;
        const playerhouseCombinedHand = currentHand.players[i].hand.concat(Object.values(currentHand.communityCards));
        finalHands[playerName] = calculateHighestHand(playerhouseCombinedHand);
    }

    const winningPlayer = Object.keys(finalHands).reduce((previousPlayer, currentPlayer) => {
        return finalHands[currentPlayer].hand_rank < finalHands[previousPlayer].hand_rank ? currentPlayer : previousPlayer;
    });

    console.log(`Winning player is ${winningPlayer}`);

    return {
        ...currentHand,
        handStage: currentHand.handStage++
    }
}

const updatePlayerTurn = (currentHand) => {
    const updatedHand = {...currentHand};
    const currentPlayerIndex = currentHand.players.findIndex(p => p.playerId === currentHand.currentPlayerTurn);
    let nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex > (currentHand.players.length - 1)) {
        nextPlayerIndex = 0;
    }

    if (nextPlayerIndex) {
        updatedHand.currentPlayerTurn = currentHand.players[nextPlayerIndex].playerId;

        return updatedHand;
    } else {

        updatedHand.handStage++;

        if (updatedHand.handStage < handStages['endGame']) {
            updatedHand.currentPlayerTurn = currentHand.players[nextPlayerIndex].playerId;
            
            return progressToNextHandStage(updatedHand)
        } else {
            return calculateWinner(updatedHand);
        }
    }
}
  
export const startNewGame = (state) => {
    //Init player hands
    const playersInHand = state.players.map((player) => {
        let playerCards = [];
        for (let i = 0; i <= 1; i++) {
            playerCards.push(dealCard());
        }

        return {
            playerId: player.name,
            hand: playerCards
        }
    });

    const newHand = {
        players: playersInHand,
        communityCards: dealFlop(),
        currentPlayerTurn: playersInHand[0].playerId,
        handStage: 1,
        totalPot: state.blinds.small + state.blinds.big
    };

    //Update blinds
    const blindsSet = state.playerPositions.smallBlind && state.playerPositions.bigBlind;

    //update positions of blinds
    let newPlayerPositions = {
        smallBlind: null,
        bigBlind: null,
    };

    if (blindsSet) {
        const previousSmallBlindIndex = state.players.findIndex((p) => {
            return p.name === state.playerPositions.smallBlind;
        });
        const previousBigBlindIndex = state.players.findIndex((p) => {
            return p.name === state.playerPositions.bigBlind;
        });

        if ((previousBigBlindIndex + 1) < (state.players.length + 1)) {
            newPlayerPositions.bigBlind = state.players[previousBigBlindIndex + 1].name;
        } else {
            newPlayerPositions.bigBlind = state.players[0].name;
        }

        if ((previousSmallBlindIndex + 1) < (state.players.length + 1)) {
            newPlayerPositions.smallBlind = state.players[previousSmallBlindIndex + 1].name;
        } else {
            newPlayerPositions.smallBlind = state.players[0].name;
        }
    } else {
        newPlayerPositions.smallBlind = state.players[0].name;
        newPlayerPositions.bigBlind = state.players[1].name;
    }

    //get big and small blind indexes to subtract blind amounts from players
    let smallBlindPlayerIndex = state.players.findIndex((p) => {
        return p.name === newPlayerPositions.smallBlind;
    });
    let bigBlindPlayerIndex = state.players.findIndex((p) => {
        return p.name === newPlayerPositions.bigBlind;
    });

    return {
        ...state,
        playerPositions: newPlayerPositions,
        currentHand: newHand,
        players: state.players.map((item, index) => {
            if (index === smallBlindPlayerIndex) {
                return {
                    ...item,
                    chips: item.chips - state.blinds.small
                };
            } else if (index === bigBlindPlayerIndex) {
                return {
                    ...item,
                    chips: item.chips - state.blinds.big
                };
            }
            return item;
        })
    };
}
  
export const addPlayer = (state, action) => {
    const newPlayer = {
        name: action.name,
        seatNumber: action.seatNumber,
        chips: 1000,
        avatar: action.avatar ?? null
    }

    return {
        ...state,
        players: [...state.players, newPlayer]
    }
}

export const updatePlayer = (state, action) => {
    const updatedPlayers = state.players.map((item) => {
        if (item.name === action.playerId) {
            return {
                ...item,
                avatar: action.avatar
            }
        }

        return item
    });

    return {
        ...state,
        players: updatedPlayers
    };
}
  
export const playerBetHandler = (state, action) => {
    let updatedHand = {...state.currentHand};
    //Add chips to pot and deduct from player
    updatedHand.totalPot += parseInt(action.bet);
    const updatedPlayers = state.players.map((item) => {
        if (item.name === action.player.name) {
            return {
                ...item,
                chips: item.chips - action.bet
            }
        }

        return item
    });

    return {
        ...state,
        currentHand: updatePlayerTurn(updatedHand),
        players: updatedPlayers
    };
}

export const playerCheckHandler = (state, action) => {
    return {
        ...state,
        currentHand: {
            ...state.currentHand,
            ...updatePlayerTurn(state.currentHand)
        }
    }
}
  
export const playerFoldHandler = (state, action) => {
    let updatedHand = updatePlayerTurn(state.currentHand);
    
    //remove player from hand
    updatedHand.players = updatedHand.players.filter(item => item.playerId !== action.player.name)

    if (updatedHand.players.length < 2) {
        //Fold end game
        const winningPlayer = updatedHand.players[0];
        console.log(`Winning player is ${winningPlayer.playerId}`);

        return {
            ...state,
            currentHand: {
                ...state.currentHand,
                players: updatedHand.players,
                handStage: 5
            },
            players: state.players.map((item) => {
                if (item.name === updatedHand.players[0].playerId) {
                    return {
                        ...item,
                        chips: item.chips + state.currentHand.totalPot
                    }
                }
            
                return item;
            })
        }
    }

    return {
        ...state,
        currentHand: {
            ...state.currentHand,
            ...updatedHand,
        }
    }
}