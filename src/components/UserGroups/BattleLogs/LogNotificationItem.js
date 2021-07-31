const LogNotificationItem = (props) => {
  const selectLogNotifHandler = () => {
    console.log(props);
    props.onOpenLogNotifModal(props.battleLogObj);
  };
  return (
    <div onClick={selectLogNotifHandler}>log request from {props.sentBy}</div>
  );
};

export default LogNotificationItem;
