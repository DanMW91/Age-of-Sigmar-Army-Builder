import { useState, useContext, useLayoutEffect, useRef } from "react";
import GroupsContext from "../../../store/groups-context";
import NotificationsContext from "../../../store/notifications-context";
import LogNotificationItem from "./LogNotificationItem";
import BattleRequestModal from "./BattleRequestModal";
import classes from "./BattleLogNotificationsList.module.css";

const BattleLogNotificationsList = () => {
  const [battleLogNotifications, setBattleLogNotifications] = useState();
  const [showRequestLogModal, setShowRequestLogModal] = useState(false);
  const modalNotificationObjRef = useRef();
  const groupsCtx = useContext(GroupsContext);
  const notificationsCtx = useContext(NotificationsContext);

  useLayoutEffect(() => {
    const currGroupNotifications =
      notificationsCtx.pendingLogNotifications.filter(
        (logNotif) =>
          Object.values(logNotif.pendingLog)[0].groupId ===
          groupsCtx.activeGroup.newGroupsObj.groupId
      );

    setBattleLogNotifications(currGroupNotifications);
  }, [
    notificationsCtx.pendingLogNotifications,
    groupsCtx.activeGroup.newGroupsObj.groupId,
  ]);

  const openLogNotifModalHandler = (notificationObj) => {
    modalNotificationObjRef.current = notificationObj;
    setShowRequestLogModal(true);
  };

  const onCloseModalHandler = () => {
    setShowRequestLogModal(false);
  };

  return (
    <>
      {showRequestLogModal && (
        <BattleRequestModal
          onCloseModal={onCloseModalHandler}
          battleLogObj={modalNotificationObjRef.current}
        />
      )}
      <div className={classes.notificationsContainer}>
        {battleLogNotifications &&
          battleLogNotifications.map((notif) => {
            const log = Object.values(notif.pendingLog)[0];

            return (
              <LogNotificationItem
                sentBy={log.battleLog.yourName}
                battleLogObj={log}
                onOpenLogNotifModal={openLogNotifModalHandler}
              />
            );
          })}
      </div>
    </>
  );
};

export default BattleLogNotificationsList;
