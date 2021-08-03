import { useContext, useRef, useState } from "react";
import { sendGroupRequest } from "../../firebase-api/firebase-api";
import MemberItem from "./MemberItem";
import GroupsContext from "../../store/groups-context";
import AuthContext from "../../store/auth-context";
import classes from "./Members.module.css";

const Members = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const membersList = Object.values(
    Object.values(groupsCtx.activeGroup)[0].members
  );

  const sendReqUserNameRef = useRef();

  const sendGroupRequestHandler = async (e) => {
    e.preventDefault();

    const groupName = Object.values(Object.values(groupsCtx.activeGroup))[0]
      .groupName;

    const groupUsers = Object.values(
      Object.values(Object.values(groupsCtx.activeGroup))[0].members
    ).map((user) => user.userName);

    if (groupUsers.includes(sendReqUserNameRef.current.value)) {
      setErrorMsg("User Already In This Group!");
      sendReqUserNameRef.current.value = "";
      setTimeout(function () {
        setErrorMsg("");
      }, 2000);
      return;
    }

    const token = authCtx.token;
    const groupId = Object.values(groupsCtx.activeGroup)[0].groupId;
    try {
      await sendGroupRequest(
        token,
        groupId,
        sendReqUserNameRef.current.value,
        groupName
      );
    } catch (err) {
      setErrorMsg(err.message);
      sendReqUserNameRef.current.value = "";
      setTimeout(function () {
        setErrorMsg("");
      }, 2000);
      return;
    }
    setErrorMsg("");

    setSuccessMsg("Invite Sent");
    sendReqUserNameRef.current.value = "";
    setTimeout(function () {
      setSuccessMsg("");
    }, 2000);
  };

  return (
    <div className={classes.membersList}>
      <h3>{Object.values(groupsCtx.activeGroup)[0].groupName}</h3>
      {groupsCtx.isAdmin && (
        <>
          <form onSubmit={sendGroupRequestHandler}>
            <label htmlFor="userName">User Name:</label>
            <input
              id="userName"
              type="text"
              required
              ref={sendReqUserNameRef}
            />
            <button type="submit">Invite User</button>
          </form>
          {errorMsg && <span className={classes.errorMsg}>{errorMsg}</span>}
          {successMsg && (
            <span className={classes.successMsg}>{successMsg}</span>
          )}
        </>
      )}
      {membersList.map((member) => (
        <MemberItem
          userName={member.userName}
          admin={member.admin}
          key={Math.random()}
        />
      ))}
    </div>
  );
};

export default Members;
