import { useContext, useLayoutEffect, useState } from "react";
import GroupRequestItem from "./GroupRequestItem";
import GroupsContext from "../../store/groups-context";
import AuthContext from "../../store/auth-context";
import { fetchGroupReqs } from "../../firebase-api/firebase-api";
import classes from "./GroupReq.module.css";

const GroupReq = (props) => {
  const [numRequests, setNumRequests] = useState(0);
  const [showRequests, setShowRequests] = useState(false);
  const groupsCtx = useContext(GroupsContext);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const token = authCtx.token;

  useLayoutEffect(() => {
    if (groupsCtx.groupReqs) {
      setNumRequests(groupsCtx.groupReqs.length);
      setShowRequests(true);
      return;
    }
  }, [groupsCtx.groupReqs]);

  const respondToRequestHandler = async () => {
    const groupReqs = await fetchGroupReqs(userId, token);

    if (!groupReqs) {
      setNumRequests(0);
      setShowRequests(false);
    }
    groupsCtx.setReqs(groupReqs);
  };

  return (
    <div className={classes.requestsContainer}>
      <div>Requests: {numRequests}</div>
      {showRequests &&
        groupsCtx.groupReqs.map((request) => (
          <GroupRequestItem
            key={Math.random()}
            groupRequest={request}
            onRespond={respondToRequestHandler}
          />
        ))}
    </div>
  );
};

export default GroupReq;
