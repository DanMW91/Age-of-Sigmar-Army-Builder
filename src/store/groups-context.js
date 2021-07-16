import React, { useState, useCallback } from "react";

const GroupsContext = React.createContext({
  allGroups: {},
  activeGroup: {},
  groupReqs: {},
});

export const GroupsContextProvider = (props) => {
  const [allGroups, setAllGroups] = useState();
  const [activeGroup, setActiveGroup] = useState();
  const [groupReqs, setGroupReqs] = useState();

  const setGroups = useCallback((groups) => {
    setAllGroups(groups);
  }, []);

  const setGroup = (group) => {
    setActiveGroup(group);
  };

  const setReqs = useCallback((groupRequests) => {
    setGroupReqs(groupRequests);
  }, []);

  const contextValue = {
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
