function PokerTable(props) {
  let tableCards;

  const activeCards = Object.values(props.cards).filter(
    (value) => value !== null
  );

  tableCards = Object.entries(activeCards).map(([key, value]) => {
    return (
      <img
        key={`house-card${key}`}
        className="playing-card"
        src={
          props.gameStage > 1
            ? value.img_uri
            : "assets/images/cards/card-back.svg"
        }
        alt="Playing Card"
      />
    );
  });

  return (
    <div id="poker-table" className="center-align">
      {props.gameStage > 0 && (
        <div id="table-center">
          <div className="house-cards-container">{tableCards}</div>
          <div id="total-pot" className="center-align ml-auto">
            <span>Pot Total: {props.handPotTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokerTable;
