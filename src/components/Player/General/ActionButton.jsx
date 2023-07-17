import { usePokerGame } from "../../../contexts/PokerGameContext";

function ActionButton(props) {
  const { dispatch } = usePokerGame();

  return (
    <button className={props.className} onClick={() => dispatch(props.dispatchObj)}>
        {props.children}
    </button>
  );
}

export default ActionButton;