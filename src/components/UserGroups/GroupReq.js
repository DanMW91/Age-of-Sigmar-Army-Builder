import { useContext, useLayoutEffect, useState } from "react";
import GroupRequestItem from "./GroupRequestItem";
import GroupsContext from "../../store/groups-context";
import classes from "./GroupReq.module.css";

const GroupReq = () => {
  const groupsCtx = useContext(GroupsContext);
  const [numRequests, setNumRequests] = useState(0);
  const [showRequests, setShowRequests] = useState(false);

  useLayoutEffect(() => {
    if (groupsCtx.groupReqs) {
      setNumRequests(groupsCtx.groupReqs.length);
      setShowRequests(true);
    }
  }, [groupsCtx.groupReqs]);

  console.log(groupsCtx.groupReqs);

  return (
    <div className={classes.requestsContainer}>
      <div>Requests: {numRequests}</div>
      {showRequests &&
        groupsCtx.groupReqs.map((request) => (
          <GroupRequestItem key={Math.random()} groupRequest={request} />
        ))}
    </div>
  );
};

export default GroupReq;
