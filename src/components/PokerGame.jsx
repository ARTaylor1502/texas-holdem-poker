import { useState } from "react";
import { dealCard, calculateHighestHand } from "../helpers/cards";
import PlayerSeat from "./PlayerSeat";
import PlayerActions from "./PlayerActions";
import PokerTable from "./PokerTable";

function PokerGame() {
  const [gameStage, setGameStage] = useState(false);
  const [players, setPlayers] = useState([]);
  const [handPotTotal, setHandPotTotal] = useState([]);
  const [bigBlind, setBigBlind] = useState({ player: false, value: 50 });
  const [smallBlind, setSmallBlind] = useState({ player: false, value: 25 });
  const [playerTurn, setPlayerTurn] = useState(false);
  const [houseHand, setHouseHand] = useState({
    flopCard1: null,
    flopCard2: null,
    flopCard3: null,
    turnCard: null,
    riverCard: null,
  });
  const [playersInHand, setPlayersInHand] = useState();

  function getPlayer(name) {
    return players.filter((player) => {
      return player.name === name;
    });
  }

  function setTablePlayers(player) {
    setPlayers((current) => [...current, player]);
  }

  function updateBlinds() {
    setSmallBlind({ player: players[0], value: smallBlind.value });
    let player = players[0];
    player.chips -= smallBlind.value;
    setPlayers([...players], player);

    setBigBlind({ player: players[1], value: bigBlind.value });

    player = players[1];
    player.chips -= bigBlind.value;
    setPlayers([...players], player);

    setHandPotTotal(smallBlind.value + bigBlind.value);
  }

  function updateGameStage(stageNumber) {
    setGameStage(stageNumber);

    if (stageNumber === 3) {
      houseHand.turnCard = dealCard();
    } else if (stageNumber === 4) {
      houseHand.riverCard = dealCard();
    }

    setHouseHand(houseHand);
  }

  function dealFlop() {
    setHouseHand({
      flopCard1: dealCard(),
      flopCard2: dealCard(),
      flopCard3: dealCard(),
      turnCard: null,
      riverCard: null,
    });
  }

  function startNewGame() {
    setGameStage(1);
    setPlayersInHand(players.map((player) => player.name));

    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      player.hand = [];

      for (let i = 0; i <= 1; i++) {
        player.hand.push(dealCard());
      }
    }

    updateBlinds();
    dealFlop();
    setPlayerTurn(players[0]);
  }

  function foldEndGame() {
    const winningPlayer = getPlayer(playersInHand[0]);
    winningPlayer[0].chips += handPotTotal;
    setHandPotTotal(0);
    updateGameStage(5);
  }

  function calculateWinner() {
    //calculate house hand

    const houseSuits = Object.values(houseHand).map((hand) => hand.suit);
    const houseValues = Object.values(houseHand).map((hand) => hand.number);

    const houseHighestHand = calculateHighestHand(houseSuits, houseValues);

    const playerOneHighestHand = calculateHighestHand(
      Object.values(getPlayer("Player One")[0].hand)
        .map((hand) => hand.suit)
        .concat(houseSuits),
      Object.values(getPlayer("Player One")[0].hand)
        .map((hand) => hand.number)
        .concat(houseValues)
    );

    const playerTwoHighestHand = calculateHighestHand(
      Object.values(getPlayer("Player Two")[0].hand)
        .map((hand) => hand.suit)
        .concat(houseSuits),
      Object.values(getPlayer("Player Two")[0].hand)
        .map((hand) => hand.number)
        .concat(houseValues)
    );

    console.log("house", houseHighestHand);
    console.log("player one", playerOneHighestHand);
    console.log("player two", playerTwoHighestHand);
    //loop through all players in hand
    //check what hand each player has
    //calculate which player has the strongest hand
  }

  function updatePlayerTurn(player) {
    const index = playersInHand.findIndex((p) => {
      return p === player.name;
    });

    const nextTurnPlayer = getPlayer(playersInHand[index + 1]);

    if (nextTurnPlayer.length) {
      setPlayerTurn(nextTurnPlayer[0]);
    } else {
      if (gameStage < 4) {
        updateGameStage(gameStage + 1);
        setPlayerTurn(players[0]);
      } else {
        calculateWinner();
      }
    }
  }

  function betHandler(player, betAmount) {
    setHandPotTotal(parseInt(handPotTotal) + parseInt(betAmount));
    player.chips -= betAmount;
    setPlayers([...players], player);
    updatePlayerTurn(player);
  }

  function playerFold(player) {
    updatePlayerTurn(player);

    const index = playersInHand.indexOf(player.name);
    if (index > -1) {
      playersInHand.splice(index, 1);
    }

    setPlayersInHand(playersInHand);

    if (playersInHand.length < 2) {
      foldEndGame();
    }
  }

  function isActivePlayer(player) {
    return player && playersInHand && playersInHand.indexOf(player.name) > -1;
  }

  return (
    <div id="poker-room" className="center-align">
      <div id="player2-area" className="player-area center-align">
        <PlayerSeat
          playerTurn={playerTurn === getPlayer("Player Two")[0]}
          player={getPlayer("Player Two")}
          activePlayer={isActivePlayer(players[1])}
          playerName="Player Two"
          avatarUrl="assets/images/avatars/man.svg"
          setTablePlayer={setTablePlayers}
          smallBlind={smallBlind}
          bigBlind={bigBlind}
        />
      </div>
      <PokerTable
        gameStage={gameStage}
        handPotTotal={handPotTotal}
        cards={houseHand}
      />
      <PlayerActions
        player={playerTurn}
        minimumAllowedBet={bigBlind}
        gameStage={gameStage}
        betHandler={betHandler}
        checkHandler={updatePlayerTurn}
        foldHandler={playerFold}
      />
      <div id="player1-area" className="player-area center-align">
        <PlayerSeat
          playerTurn={playerTurn === getPlayer("Player One")[0]}
          player={getPlayer("Player One")}
          activePlayer={isActivePlayer(players[0])}
          playerName="Player One"
          avatarUrl="assets/images/avatars/lady.svg"
          setTablePlayer={setTablePlayers}
          smallBlind={smallBlind}
          bigBlind={bigBlind}
        />
      </div>

      {players.length > 1 && (
        <button id="new-game-btn" onClick={startNewGame}>
          New Game
        </button>
      )}
    </div>
  );
}

export default PokerGame;
