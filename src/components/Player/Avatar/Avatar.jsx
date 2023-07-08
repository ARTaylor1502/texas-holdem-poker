function Avatar({ isActive, imgSrc, clickHandler }) {
  return (
    <div
      className={`seat center-align ${
      isActive ? "active" : "inactive"
    }`}
      onClick={clickHandler}
    >
      <img src={imgSrc} alt="Avatar" />
    </div>
  );
}

export default Avatar;
