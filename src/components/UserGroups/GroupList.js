import { useRef, useContext, useState, useLayoutEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { createGroup, fetchGroups } from "../../firebase-api/firebase-api";
import GroupItem from "./GroupItem";
import GroupReq from "./GroupReq";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./GroupList.module.css";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";

const GroupList = (props) => {
  const [isLoading, setIsLoading] = useState();
  const [groupsArray, setGroupsArray] = useState();

  const groupNameRef = useRef();
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const setGroups = groupsCtx.setGroups;

  useLayoutEffect(() => {
    const groups = groupsCtx.allGroups
      ? Object.values(groupsCtx.allGroups)
      : "";
    setGroupsArray(groups);
  }, [groupsCtx.allGroups]);

  const toggleLoading = () => {
    setIsLoading((prevState) => !prevState);
  };

  const createGroupHandler = async (e) => {
    e.preventDefault();
    const userId = authCtx.userId;
    const token = authCtx.token;
    const userName = authCtx.userName;
    const groupName = groupNameRef.current.value;
    const groupId = uuidv4();
    toggleLoading();

    await createGroup(userId, token, userName, groupName, groupId);
    const updatedGroups = await fetchGroups(userId, token);
    setGroups(updatedGroups);
    toggleLoading();
  };

  return (
    <div className={classes.groupSection}>
      <form onSubmit={createGroupHandler}>
        <label htmlFor="groupName">New Group:</label>
        <input id="groupName" type="text" ref={groupNameRef} required />
        <button type="submit">+ Create Group</button>
      </form>
      <h3>My Groups:</h3>
      <div className={classes.groupList}>
        {groupsArray &&
          !isLoading &&
          groupsArray.map((group) => {
            return (
              <GroupItem
                key={group.groupId}
                groupName={group.groupName}
                groupId={group.groupId}
              />
            );
          })}
      </div>
      {!isLoading && <GroupReq toggleLoading={props.toggleLoading} />}
      {isLoading && <LoadingSpinner className={classes.loadingSpinner} />}
    </div>
  );
};

export default GroupList;
