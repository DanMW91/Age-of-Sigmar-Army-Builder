import { useState, useContext, useLayoutEffect, useRef } from "react";
import GroupsContext from "../../../store/groups-context";
import NotificationsContext from "../../../store/notifications-context";
import LogNotificationItem from "./LogNotificationItem";
import BattleRequestModal from "./BattleRequestModal";
import classes from "./BattleLogNotificationsList.module.css";

const BattleLogNotificationsList = (props) => {
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
          Object.values(groupsCtx.activeGroup)[0].groupId
      );

    setBattleLogNotifications(currGroupNotifications);
  }, [notificationsCtx.pendingLogNotifications, groupsCtx.activeGroup]);

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
          refreshLogs={props.refreshLogs}
        />
      )}

      <div className={classes.notificationsContainer}>
        <div className={classes.requestTitle}>
          <h3>Requests:</h3>
        </div>
        <div className={classes.notificationsList}>
          {battleLogNotifications &&
            battleLogNotifications.map((notif) => {
              const log = Object.values(notif.pendingLog)[0];

              return (
                <LogNotificationItem
                  key={Math.random()}
                  sentBy={log.battleLog.yourName}
                  battleLogObj={log}
                  onOpenLogNotifModal={openLogNotifModalHandler}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BattleLogNotificationsList;
