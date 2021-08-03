import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { fetchGroupReqs } from "../firebase-api/firebase-api";
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

  useLayoutEffect(() => {
    if (!authCtx.token) return;
    (async () => {
      const groupReqs = await fetchGroupReqs(authCtx.userId, authCtx.token);

      setGroupReqs(groupReqs);
    })();
  }, [authCtx.token, authCtx.userId]);

  useEffect(() => {
    if (!activeGroup) return;

    //check if user is Admin for active group

    const group = Object.values(activeGroup)[0];

    const admin = Object.values(group.members).filter(
      (member) => member.userId === authCtx.userId
    )[0].admin;

    setIsAdmin(admin);
  }, [activeGroup, authCtx.userId]);

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
