import Card from "../../UI/Card";
import classes from "./LogNotificationItem.module.css";

const LogNotificationItem = (props) => {
  const selectLogNotifHandler = () => {
    props.onOpenLogNotifModal(props.battleLogObj);
  };
  return (
    <Card className={classes.notification} onClick={selectLogNotifHandler}>
      Battlelog request from {props.sentBy}
    </Card>
  );
};

export default LogNotificationItem;
