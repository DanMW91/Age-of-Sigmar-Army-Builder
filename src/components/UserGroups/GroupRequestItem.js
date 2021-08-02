import Card from "../UI/Card";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";
import {
  addUserToGroup,
  deleteGroupRequest,
  fetchGroups,
} from "../../firebase-api/firebase-api";
import classes from "./GroupRequestItem.module.css";

const GroupRequestItem = (props) => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const setGroups = groupsCtx.setGroups;
  const groupIdRef = useRef(Object.values(props.groupRequest)[0].groupId);
  const groupNameRef = useRef(Object.values(props.groupRequest)[0].groupName);

  const acceptHandler = async () => {
    const userId = authCtx.userId;
    const userName = authCtx.userName;
    const token = authCtx.token;
    const groupId = groupIdRef.current;
    const groupName = groupNameRef.current;

    await addUserToGroup(userId, userName, token, groupId, groupName);

    await props.onRespond();
    const updatedGroups = await fetchGroups(userId, token);
    setGroups(updatedGroups);
  };

  const rejectHandler = async () => {
    const userId = authCtx.userId;
    const groupId = groupIdRef.current;
    const token = authCtx.token;

    await deleteGroupRequest(userId, groupId, token);
    await props.onRespond();
  };

  return (
    <Card>
      <div className={classes.requestItem}>
        <div>{groupNameRef.current}</div>
        <button onClick={acceptHandler}>Accept</button>
        <button onClick={rejectHandler}>Reject</button>
      </div>
    </Card>
  );
};

export default GroupRequestItem;
