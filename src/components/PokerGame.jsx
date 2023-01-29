import { useState } from "react";
import PlayerSeat from "./PlayerSeat";
import Timer from "./Timer";
import PlayerActions from "./PlayerActions";
import PokerTable from "./PokerTable";

function PokerGame() {
  const pokerGameStages = [
    {
      stage_number: 1,
      stage_name: "Pre Flop",
      cards_in_play: 3,
    },
    {
      stage_number: 2,
      stage_name: "Flop",
      cards_in_play: 3,
    },
    {
      stage_number: 3,
      stage_name: "Turn",
      cards_in_play: 4,
    },
    {
      stage_number: 4,
      stage_name: "River",
      cards_in_play: 5,
    },
  ];
  const suits = ["club", "heart", "spade", "diamond"];

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
    riverCard: null,
    turnCard: null,
  });
  const [playersInHand, setPlayersInHand] = useState();

  function dealCard() {
    const cardClub = suits[Math.floor(Math.random() * suits.length)];
    const cardNumber = Math.floor(Math.random() * 13) + 1;
    const imgUri = `assets/images/cards/${cardClub}${cardNumber}.svg`;
    const cardValue = cardNumber > 10 ? 10 : cardNumber;

    return {
      club: cardClub,
      number: cardNumber,
      img_uri: imgUri,
      value: cardValue,
    };
  }

  function getPlayer(name) {
    return players.filter((player) => {
      return player.name === name;
    });
  }

  function setGamePlayers(player) {
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

  function dealFlop() {
    houseHand.flopCard1 = dealCard();
    houseHand.flopCard2 = dealCard();
    houseHand.flopCard3 = dealCard();

    setHouseHand(houseHand);
  }

  function startNewGame() {
    setGameStage(1);
    setPlayersInHand(players);

    for (let i = 0; i < players.length; i++) {
      let player = players[i];

      for (let i = 0; i <= 1; i++) {
        player.hand.push(dealCard());
      }
    }

    updateBlinds();
    dealFlop();
    setPlayerTurn(players[0]);
  }

  function betHandler(player, betAmount) {
    // make bet and add to pot
    setHandPotTotal(parseInt(handPotTotal) + parseInt(betAmount));
    player.chips -= betAmount;
    setPlayers([...players], player);

    //set next player as turn
    const index = players.findIndex((p) => {
      return p === player;
    });

    const nextTurnPlayer = players[index + 1];

    if (nextTurnPlayer) {
      setPlayerTurn(nextTurnPlayer);
    } else {
      setGameStage(gameStage + 1);
    }
  }

  return (
    <div id="poker-room" className="center-align">
      <div id="player2-area" className="player-area center-align">
        <Timer seconds={30} />
        <PlayerSeat
          playerTurn={playerTurn === players[1]}
          player={getPlayer("Player Two")}
          playerName="Player Two"
          avatarUrl="assets/images/avatars/man.svg"
          setGamePlayers={setGamePlayers}
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
        betHandler={betHandler}
      />
      <div id="player1-area" className="player-area center-align">
        <Timer seconds={30} />
        <PlayerSeat
          playerTurn={playerTurn === players[0]}
          player={getPlayer("Player One")}
          playerName="Player One"
          avatarUrl="assets/images/avatars/lady.svg"
          setGamePlayers={setGamePlayers}
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
