import Card from "../UI/Card";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { addUserToGroup } from "../../firebase-api/firebase-api";
import classes from "./GroupRequestItem.module.css";

const GroupRequestItem = (props) => {
  const authCtx = useContext(AuthContext);
  const groupIdRef = useRef(Object.values(props.groupRequest)[0].groupId);
  const groupNameRef = useRef(Object.values(props.groupRequest)[0].groupName);

  const acceptHandler = () => {
    const userId = authCtx.userId;
    const userName = authCtx.userName;
    const token = authCtx.token;
    const groupId = groupIdRef.current;
    const groupName = groupNameRef.current;

    addUserToGroup(userId, userName, token, groupId, groupName);
  };

  return (
    <Card>
      <div className={classes.requestItem}>
        <div>{groupNameRef.current}</div>
        <button onClick={acceptHandler}>Accept</button> <button>Reject</button>
      </div>
    </Card>
  );
};

export default GroupRequestItem;
