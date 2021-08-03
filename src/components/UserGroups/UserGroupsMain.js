import { useLayoutEffect, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";
import { fetchGroupReqs, fetchGroups } from "../../firebase-api/firebase-api";

import GroupList from "./GroupList";
import GroupDetail from "./GroupDetail";
import Card from "../UI/Card";
import classes from "./UserGroupsMain.module.css";

const UserGroupsMain = () => {
  const [showGroups, setShowGroups] = useState(false);
  const groupsCtx = useContext(GroupsContext);
  const setGroups = groupsCtx.setGroups;
  const setGroupReqs = groupsCtx.setReqs;
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const token = authCtx.token;

  useLayoutEffect(() => {
    let mounted = true;

    (async () => {
      const groups = await fetchGroups(userId, token);

      if (mounted) {
        setGroups(groups);

        setShowGroups(true);
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [userId, token, setGroups]);

  return (
    <Card className={classes.card}>
      <section className={classes.mainContainer}>
        <div className={classes.groupsContent}>
          {showGroups && <GroupList />}
          {groupsCtx.activeGroup && <GroupDetail />}
        </div>
      </section>
    </Card>
  );
};

export default UserGroupsMain;
