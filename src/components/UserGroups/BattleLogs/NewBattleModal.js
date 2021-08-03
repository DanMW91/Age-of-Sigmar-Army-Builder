import { useContext, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../UI/Modal";
import AuthContext from "../../../store/auth-context";
import GroupsContext from "../../../store/groups-context";
import classes from "./NewBattleModal.module.css";
import { sendNotification } from "../../../firebase-api/firebase-api";

const NewBattleModal = (props) => {
  const [formState, setFormState] = useState("DETAILS");
  const [opponent, setOpponent] = useState();
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const battleNameRef = useRef();
  const battleplanRef = useRef();
  const pointsRef = useRef();
  const yourScoreRef = useRef();
  const opponentScoreRef = useRef();
  const winnerRef = useRef();
  const dateRef = useRef();
  const armyListRef = useRef();

  const logObjectRef = useRef();

  const currentUser = authCtx.userName;

  const opponentRef = useRef();
  const users = Object.values(Object.values(groupsCtx.activeGroup)[0].members)
    .filter((user) => user.userName !== currentUser)
    .map((user) => user.userName);

  const submitDetailsHandler = (e) => {
    e.preventDefault();
    if (
      battleNameRef &&
      battleplanRef &&
      pointsRef &&
      yourScoreRef &&
      opponentScoreRef &&
      winnerRef &&
      dateRef
    ) {
      logObjectRef.current = {
        battleName: battleNameRef.current.value,
        yourName: currentUser,
        opponentName: opponentRef.current.value,
        battleplan: battleplanRef.current.value,
        points: pointsRef.current.value,
        yourScore: yourScoreRef.current.value,
        opponentScore: opponentScoreRef.current.value,
        winner: winnerRef.current.value,
        date: dateRef.current.value,
      };
    }

    setFormState("ARMY-LIST");
  };

  const submitLogHandler = async (e) => {
    e.preventDefault();

    const token = authCtx.token;
    logObjectRef.current.armyList1 = armyListRef.current.value;

    const groupId = Object.values(groupsCtx.activeGroup)[0].groupId;

    const notificationObj = {
      targetUserName: opponent,
      groupId,
      battleLog: logObjectRef.current,
      type: "pendingLog",
      notificationId: uuidv4(),
    };

    await sendNotification(token, notificationObj);
    props.onCloseModal();
  };

  return (
    <Modal className={classes.newBattleModal} onCloseModal={props.onCloseModal}>
      {formState === "DETAILS" && (
        <form
          className={classes.logForm}
          type="submit"
          onSubmit={submitDetailsHandler}
        >
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
              <label htmlFor="battleName">Battle Name:</label>
              <input type="text" id="battleName" ref={battleNameRef} required />
              <label htmlFor="battleplan">Battleplan:</label>
              <input type="text" id="battleplan" ref={battleplanRef} required />
              <label htmlFor="points">Points:</label>
              <input type="text" id="points" ref={pointsRef} required />
              <label htmlFor="your-score">Your Score:</label>
              <input
                type="number"
                id="your-score"
                ref={yourScoreRef}
                required
              />
              <label htmlFor="opponent-score">{opponent}'s Score:</label>
              <input
                type="number"
                id="opponent-score"
                ref={opponentScoreRef}
                required
              />
              <label htmlFor="winner">Winner:</label>
              <select id="Winner" ref={winnerRef} required>
                <option value={currentUser}>{currentUser}</option>
                <option value={opponentRef.current.value}>
                  {opponentRef.current.value}
                </option>
              </select>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" ref={dateRef} required />
              <button type="submit">Submit</button>
            </>
          )}
        </form>
      )}
      {formState === "ARMY-LIST" && (
        <form className={classes.armyListForm} onSubmit={submitLogHandler}>
          <label htmlFor="armyList">Enter Army List:</label>
          <input
            className={classes.armyListInput}
            type="textarea"
            ref={armyListRef}
            required
          />
          <button type="submit">Submit Log</button>
        </form>
      )}
    </Modal>
  );
};

export default NewBattleModal;
