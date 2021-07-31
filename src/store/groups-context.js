import React, { useState, useCallback, useEffect, useContext } from "react";
import AuthContext from "./auth-context";

const GroupsContext = React.createContext({
  allGroups: {},
  activeGroup: {},
  groupReqs: {},
});

export const GroupsContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allGroups, setAllGroups] = useState();
  const [activeGroup, setActiveGroup] = useState();
  const [groupReqs, setGroupReqs] = useState();

  useEffect(() => {
    if (!activeGroup) return;

    //check if user is Admin for active group

    const group = Object.values(activeGroup)[0];

    const admin = group.members.filter(
      (member) => member.userId === authCtx.userId
    )[0].admin;

    setIsAdmin(admin);
  }, [activeGroup, authCtx.userId]);

  const setGroups = useCallback((groups) => {
    setAllGroups(groups);
  }, []);

  const setGroup = (group) => {
    setActiveGroup(group);
    console.log(group);
  };

  const setReqs = useCallback((groupRequests) => {
    setGroupReqs(groupRequests);
  }, []);

  const contextValue = {
    isAdmin,
    allGroups,
    activeGroup,
    groupReqs,
    setReqs,
    setGroups,
    setGroup,
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsContext;
