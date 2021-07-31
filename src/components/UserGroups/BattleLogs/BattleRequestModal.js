import { useContext } from "react";

import Modal from "../../UI/Modal";

import classes from "./BattleRequestModal.module.css";
import NotificationsContext from "../../../store/notifications-context";

const BattleRequestModal = (props) => {
  const notificationsCtx = useContext(NotificationsContext);

  const senderName = props.battleLogObj.battleLog.yourName;
  const winner = props.battleLogObj.battleLog.winner;
  const date = props.battleLogObj.battleLog.date;
  const points = props.battleLogObj.battleLog.points;

  const notificationId = props.battleLogObj.notificationId;
  console.log(notificationId);

  const submitListHandler = () => {};

  const rejectHandler = () => {
    console.log(notificationId);
    notificationsCtx.deleteNotification(notificationId);
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
      <div>Winner: {winner}</div>
      <div>Points: {points} </div>
      <form className={classes.armyForm} onSubmit={submitListHandler}>
        <label htmlFor="armyList">Enter your Army List:</label>
        <textarea className={classes.armyInput} id="armyList" name="armyList" />
        <button type="submit">Accept and Submit</button>
      </form>
      <button onClick={rejectHandler}>Reject</button>
    </Modal>
  );
};

export default BattleRequestModal;
