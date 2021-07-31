import { useState, useContext, useLayoutEffect } from "react";
import NotificationsContext from "../../store/notifications-context";
import GroupsContext from "../../store/groups-context";
import Members from "./Members";
import BattleLogsContainer from "./BattleLogs/BattleLogsContainer";
import Notification from "../UI/Notification";
import classes from "./GroupDetail.module.css";

const GroupDetail = () => {
  const [displayPage, setDisplayPage] = useState("MEMBERS");

  const notificationsCtx = useContext(NotificationsContext);
  const groupsCtx = useContext(GroupsContext);

  useLayoutEffect(() => {
    setDisplayPage("MEMBERS");
  }, [groupsCtx.activeGroup]);

  const setMembersViewHandler = () => {
    setDisplayPage("MEMBERS");
  };

  const setBattleLogsViewHandler = () => {
    setDisplayPage("BATTLE-LOGS");
  };

  return (
    <section className={classes.groupDetail}>
      <nav className={classes.detailNav}>
        <div
          className={`${classes.detailNavItem} ${
            displayPage === "MEMBERS" ? classes.active : ""
          }`}
          onClick={setMembersViewHandler}
        >
          Members
        </div>
        <div
          className={`${classes.detailNavItem} ${
            displayPage === "BATTLE-LOGS" ? classes.active : ""
          }`}
          onClick={setBattleLogsViewHandler}
        >
          Battle Logs
          {notificationsCtx.currentGroupHasNotifications && (
            <Notification className={classes.notification} />
          )}
        </div>
      </nav>
      {displayPage === "BATTLE-LOGS" && (
        <BattleLogsContainer
          hasNotifications={notificationsCtx.currentGroupHasNotifications}
        />
      )}
      {displayPage === "MEMBERS" && <Members />}
    </section>
  );
};

export default GroupDetail;
