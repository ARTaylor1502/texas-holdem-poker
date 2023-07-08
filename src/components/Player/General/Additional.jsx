function Additional({additional}) {
    if (!additional) {
        return null;
    }

    return (
        <div className="player-additional">{additional}</div>
    );
}
  
export default Additional;
  