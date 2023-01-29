function PokerTable(props) {
  return (
    <div id="poker-table" className="center-align">
      {props.gameStage > 0 && (
        <div id="table-center">
          <div className="house-cards-container">
            {Object.entries(props.cards).map(
              ([key, value]) =>
                value !== null && (
                  <img
                    key={`house-card${key}`}
                    className="playing-card"
                    src={"assets/images/cards/card-back.svg"}
                    alt="Playing Card"
                  />
                )
            )}
          </div>
          <div id="total-pot" className="center-align ml-auto">
            <span>Pot Total: {props.handPotTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokerTable;
