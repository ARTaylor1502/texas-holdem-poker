function VacantSeat({setShowNameInput, seatNumber}) {
    return (
        <div
            className={`seat-container seat-position-${seatNumber}`}
        >
            <div className="seat center-align" onClick={() => setShowNameInput(true)}>
                <span>Take a seat</span>
            </div>
        </div>
    );
  }
  
  export default VacantSeat;
  