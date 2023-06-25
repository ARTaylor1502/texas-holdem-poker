function PlayerAvatar({ isActivePlayer, playerAvatar }) {
  return (
    <div
        className={`seat taken-seat center-align ${
        isActivePlayer ? "active" : "inactive"
        }`}>
        <img src={playerAvatar} alt="Player avatar" />
    </div>
  );
}

export default PlayerAvatar;
