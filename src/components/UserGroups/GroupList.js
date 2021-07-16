import { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { createGroup } from "../../firebase-api/firebase-api";
import GroupItem from "./GroupItem";
import GroupReq from "./GroupReq";
import classes from "./GroupList.module.css";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";

const GroupList = () => {
  const groupNameRef = useRef();
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);

  const groupsArray = groupsCtx.allGroups
    ? Object.values(groupsCtx.allGroups)
    : "";

  const createGroupHandler = (e) => {
    e.preventDefault();
    const userId = authCtx.userId;
    const token = authCtx.token;
    const userName = authCtx.userName;
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
      <h3>My Groups:</h3>
      {groupsArray &&
        groupsArray.map((group) => {
          return (
            <GroupItem
              key={Math.random()}
              groupName={group.groupName}
              groupId={group.groupId}
            />
          );
        })}
      <GroupReq />
    </div>
  );
};

export default GroupList;
