import { usePokerGame } from "../../contexts/PokerGameContext";
import Avatar from "./Avatar";

function AvatarSelection({playerId, seatNumber}) {
    const { dispatch } = usePokerGame();

    const addPlayerAvatar = (playerId, avatar) => {
        dispatch({type: 'updatePlayer', playerId: playerId, avatar: avatar});
    }

    return (
        <div className={`seat-container seat-position-${seatNumber}`}>
            <div className="avatar-selector">
                <label>Please select an avatar:</label>
                <div className="avatars">
                    <Avatar isActive={true} imgSrc="assets/images/avatars/lady.svg" clickHandler={() => addPlayerAvatar(playerId, "assets/images/avatars/lady.svg")} />
                    <Avatar isActive={true} imgSrc="assets/images/avatars/man.svg" clickHandler={() => addPlayerAvatar(playerId, "assets/images/avatars/man.svg")} />
                </div> 
            </div>
        </div>
    );
}
  
export default AvatarSelection;
  