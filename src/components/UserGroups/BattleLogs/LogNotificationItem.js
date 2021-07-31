const LogNotificationItem = (props) => {
  const selectLogNotifHandler = () => {
    props.onOpenLogNotifModal(props.battleLogObj);
  };
  return (
    <div onClick={selectLogNotifHandler}>log request from {props.sentBy}</div>
  );
};

export default LogNotificationItem;
