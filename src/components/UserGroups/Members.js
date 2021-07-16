import { useContext, useRef } from "react";
import { sendGroupRequest } from "../../firebase-api/firebase-api";
import MemberItem from "./MemberItem";
import GroupsContext from "../../store/groups-context";
import AuthContext from "../../store/auth-context";
import classes from "./Members.module.css";

const Members = () => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const membersList = Object.values(groupsCtx.activeGroup)[0].members;
  const sendReqUserNameRef = useRef();

  const sendGroupRequestHandler = (e) => {
    e.preventDefault();

    const groupName = Object.values(groupsCtx.activeGroup)[0].groupName;

    const groupUsers = Object.values(groupsCtx.activeGroup)[0].members.map(
      (user) => user.userName
    );
    if (groupUsers.includes(sendReqUserNameRef.current.value)) return;
    console.log("got past");
    const token = authCtx.token;
    const groupId = Object.values(groupsCtx.activeGroup)[0].groupId;
    sendGroupRequest(
      token,
      groupId,
      sendReqUserNameRef.current.value,
      groupName
    );
  };

  return (
    <div className={classes.membersList}>
      <h3>{Object.values(groupsCtx.activeGroup)[0].groupName}</h3>
      <form onSubmit={sendGroupRequestHandler}>
        <label htmlFor="userName">User Name:</label>
        <input id="userName" type="text" required ref={sendReqUserNameRef} />
        <button type="submit">Invite User</button>
      </form>
      {membersList.map((member) => (
        <MemberItem userName={member.userName} />
      ))}
    </div>
  );
};

export default Members;
