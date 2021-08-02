import { useContext, useLayoutEffect, useState } from "react";
import { fetchActiveGroup } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";
import NotificationsContext from "../../store/notifications-context";
import Notification from "../UI/Notification";
import Card from "../UI/Card";
import classes from "./GroupItem.module.css";

const GroupItem = (props) => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const notificationsCtx = useContext(NotificationsContext);
  const [hasNotification, setHasNotification] = useState(false);

  const groupId = props.groupId;

  useLayoutEffect(() => {
    if (notificationsCtx.groupsWithNotifications) {
      setHasNotification(
        notificationsCtx.groupsWithNotifications.includes(groupId)
      );
    } else {
      setHasNotification(false);
    }
  }, [groupId, notificationsCtx.groupsWithNotifications]);

  const setActiveGroupHandler = async () => {
    const token = authCtx.token;
    const activeGroup = await fetchActiveGroup(token, groupId);
    groupsCtx.setGroup(activeGroup);
  };

  return (
    <Card className={classes.groupItem} onClick={setActiveGroupHandler}>
      {hasNotification && <Notification className={classes.notification} />}
      <h3>{props.groupName}</h3>
    </Card>
  );
};

export default GroupItem;
