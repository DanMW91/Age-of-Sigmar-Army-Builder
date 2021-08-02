import { useContext, useRef } from "react";
import AuthContext from "../../../store/auth-context";
import GroupsContext from "../../../store/groups-context";
import Modal from "../../UI/Modal";
import classes from "./BattleRequestModal.module.css";
import NotificationsContext from "../../../store/notifications-context";
import { storeLog } from "../../../firebase-api/firebase-api";

const BattleRequestModal = (props) => {
  const groupsCtx = useContext(GroupsContext);
  const authCtx = useContext(AuthContext);
  const notificationsCtx = useContext(NotificationsContext);
  const armyListRef = useRef();

  const senderName = props.battleLogObj.battleLog.yourName;
  const battleName = props.battleLogObj.battleLog.battleName;
  const winner = props.battleLogObj.battleLog.winner;
  const date = props.battleLogObj.battleLog.date;
  const points = props.battleLogObj.battleLog.points;

  const notificationId = props.battleLogObj.notificationId;

  const submitListHandler = async (e) => {
    e.preventDefault();
    if (!armyListRef.current.value) return;
    const token = authCtx.token;

    const currentGroupId = Object.values(groupsCtx.activeGroup)[0].groupId;
    const armyList = armyListRef.current.value;
    const logObj = props.battleLogObj.battleLog;

    logObj.armyList2 = armyList;

    await storeLog(token, currentGroupId, logObj);
    await notificationsCtx.deleteNotification(notificationId);
    await props.refreshLogs();
    props.onCloseModal();
  };

  const rejectHandler = async () => {
    await notificationsCtx.deleteNotification(notificationId);
    props.onCloseModal();
  };

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      className={classes.battleRequestmodal}
    >
      <div>
        {senderName} wants to log a battle you had on {date}
      </div>
      <div className={classes.battleName}>{battleName}</div>
      <div>Winner: {winner}</div>
      <div>Points: {points} </div>
      <form className={classes.armyForm} onSubmit={submitListHandler}>
        <label htmlFor="armyList">Enter your Army List:</label>
        <textarea
          className={classes.armyInput}
          id="armyList"
          name="armyList"
          ref={armyListRef}
          required
        />
        <button type="submit">Accept and Submit</button>
      </form>
      <button onClick={rejectHandler}>Reject</button>
    </Modal>
  );
};

export default BattleRequestModal;
