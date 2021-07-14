import { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { createGroup } from "../../firebase-api/firebase-api";
import classes from "./GroupList.module.css";
import AuthContext from "../../store/store";
const GroupList = () => {
  const groupNameRef = useRef();
  const authCtx = useContext(AuthContext);

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
    </div>
  );
};

export default GroupList;
