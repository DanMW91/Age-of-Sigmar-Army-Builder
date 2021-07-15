import { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { createGroup } from "../../firebase-api/firebase-api";
import Card from "../UI/Card";
import classes from "./GroupList.module.css";
import AuthContext from "../../store/store";

const GroupItem = (props) => {
  console.log(props);

  return <Card className={classes.groupItem}>{props.groupName}</Card>;
};

const GroupList = (props) => {
  const groupNameRef = useRef();
  const authCtx = useContext(AuthContext);
  console.log(props);
  const groupsArray = Object.values(props.groups);
  console.log(groupsArray);

  const createGroupHandler = (e) => {
    e.preventDefault();
    const userId = authCtx.userId;
    const token = authCtx.token;
    const userName = authCtx.userName;
    console.log(userName);
    const groupName = groupNameRef.current.value;
    const groupId = uuidv4();
    createGroup(userId, token, userName, groupName, groupId);
  };

  return (
    <div className={classes.groupList}>
      <form onSubmit={createGroupHandler}>
        <label htmlFor="groupName">Group Name:</label>
        <input id="groupName" type="text" ref={groupNameRef} required />
        <button type="submit">+ Create Group</button>
      </form>
      {groupsArray.map((group) => {
        return <GroupItem key={Math.random()} groupName={group.groupName} />;
      })}
    </div>
  );
};

export default GroupList;
