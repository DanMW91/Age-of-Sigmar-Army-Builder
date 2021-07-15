import { useEffect, useContext, useState } from "react";
import AuthContext from "../../store/store";
import { fetchGroups } from "../../firebase-api/firebase-api";
import GroupList from "./GroupList";
import Card from "../UI/Card";
import classes from "./UserGroupsMain.module.css";

const UserGroupsMain = () => {
  const [groupsData, setGroupsData] = useState();
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const token = authCtx.token;

  useEffect(() => {
    let mounted = true;

    (async () => {
      const groups = await fetchGroups(userId, token);
      if (mounted) setGroupsData(groups);
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [token, userId]);

  return (
    <Card className={classes.card}>
      <section className={classes.mainContainer}>
        <div className={classes.groupsHeader}>My Groups</div>
        <div className={classes.groupsContent}>
          {groupsData && <GroupList groups={groupsData} />}
        </div>
      </section>
    </Card>
  );
};

export default UserGroupsMain;
