import classes from "./Notification.module.css";

const Notification = (props) => {
  return <div className={`${classes.notification} ${props.className}`}>!</div>;
};

export default Notification;
