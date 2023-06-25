function PlayerInfo({player}) {
    return (
        <div className="player-info">
            <div className="player-name">{player.name}</div>
            <div className="player-chips">{player.chips}</div>
        </div>
    );
}
  
export default PlayerInfo;
  