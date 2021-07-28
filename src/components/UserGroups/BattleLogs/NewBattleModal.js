import { useContext, useState, useRef } from "react";
import Modal from "../../UI/Modal";
import AuthContext from "../../../store/auth-context";
import GroupsContext from "../../../store/groups-context";
import classes from "./NewBattleModal.module.css";

const NewBattleModal = (props) => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const currentUser = authCtx.userName;
  const [opponent, setOpponent] = useState();
  console.log(opponent);
  const opponentRef = useRef();
  const users = Object.values(groupsCtx.activeGroup)[0]
    .members.filter((user) => user.userName !== currentUser)
    .map((user) => user.userName);

  return (
    <Modal className={classes.newBattleModal} onCloseModal={props.onCloseModal}>
      <form className={classes.logForm} type="submit">
        <label htmlFor="opponent">Opponent:</label>

        <select
          id="opponent"
          className={classes.option}
          ref={opponentRef}
          onChange={() => setOpponent(opponentRef.current.value)}
          required
        >
          <option hidden disabled selected value>
            {" "}
            -- select opponent --{" "}
          </option>
          {users.map((user) => (
            <option value={user}>{user}</option>
          ))}
        </select>
        {opponent && (
          <>
            <label htmlFor="battleplan">Battleplan:</label>
            <input type="text" id="battleplan" required />
            <label htmlFor="points">Points:</label>
            <input type="text" id="points" required />
            <label htmlFor="your-score">Your Score:</label>
            <input type="number" id="your-score" />
            <label htmlFor="opponent-score">{opponent} Score:</label>
            <input type="number" id="opponent-score" />
            <label htmlFor="winner">Winner:</label>
            <select id="Winner">
              <option value={currentUser}>{currentUser}</option>
              <option value={opponentRef.current.value}>
                {opponentRef.current.value}
              </option>
            </select>
          </>
        )}
      </form>
    </Modal>
  );
};

export default NewBattleModal;
