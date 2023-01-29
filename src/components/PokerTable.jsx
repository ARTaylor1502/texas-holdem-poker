function PokerTable(props) {
  return (
    <div id="poker-table" className="center-align">
      {props.gameStage > 0 && (
        <div>
          <div className="house-cards-container">
            {props.player[0].hand.map((card, i) => {
              return (
                <img
                  key={`house-card${i}`}
                  className="playing-card"
                  src={"assets/images/cards/card-back.svg"}
                  alt="Playing Card"
                />
              );
            })}
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
