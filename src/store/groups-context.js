import React, { useState, useCallback } from "react";

const GroupsContext = React.createContext({
  allGroups: {},
  activeGroup: {},
});

export const GroupsContextProvider = (props) => {
  const [allGroups, setAllGroups] = useState();
  const [activeGroup, setActiveGroup] = useState();
  const [groupRequests, setGroupRequests] = useState();
  const setGroups = useCallback((groups) => {
    setAllGroups(groups);
  }, []);

  const setGroup = (group) => {
    setActiveGroup(group);
  };

  const contextValue = {
    allGroups,
    activeGroup,
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
