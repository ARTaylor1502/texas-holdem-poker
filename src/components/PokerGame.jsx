import { useState } from "react";
import PlayerSeat from "./PlayerSeat";
import Timer from "./Timer";

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
  const [playerTurn, setPlayerTurn] = useState();
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

  function startNewGame() {
    setGameStage(1);
    setPlayersInHand(players);

    for (let i = 0; i < players.length; i++) {
      let player = players[i];

      for (let i = 0; i <= 1; i++) {
        player.hand.push(dealCard());
      }

      setPlayers([...players], player);
    }

    updateBlinds();
    setPlayerTurn(players[0]);
  }

  return (
    <div id="poker-room" className="center-align">
      <div id="player2-area" className="player-area center-align">
        <Timer seconds={30} />
        <PlayerSeat
          player={getPlayer("Player Two")}
          playerName="Player Two"
          avatarUrl="assets/images/avatars/man.svg"
          setGamePlayers={setGamePlayers}
          smallBlind={smallBlind}
          bigBlind={bigBlind}
        />
      </div>
      <div id="poker-table" className="center-align">
        {gameStage > 0 && (
          <div id="total-pot" className="center-align ml-auto">
            <span>Pot Total: {handPotTotal}</span>
          </div>
        )}
      </div>
      <div id="player1-area" className="player-area center-align">
        <Timer seconds={30} />
        <PlayerSeat
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
