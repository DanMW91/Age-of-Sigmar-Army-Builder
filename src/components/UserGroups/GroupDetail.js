import { useState, useContext } from "react";
import NotificationsContext from "../../store/notifcations-context";
import Members from "./Members";
import BattleLogsContainer from "./BattleLogs/BattleLogsContainer";
import classes from "./GroupDetail.module.css";

const GroupDetail = () => {
  const [displayPage, setDisplayPage] = useState("MEMBERS");
  const notificationsCtx = useContext(NotificationsContext);

  const battleLogNotification = notificationsCtx.pendingLogNotifications
    ? true
    : false;
  console.log(battleLogNotification);

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
          {battleLogNotification && (
            <div className={classes.notification}>!</div>
          )}
        </div>
      </nav>
      {displayPage === "BATTLE-LOGS" && <BattleLogsContainer />}
      {displayPage === "MEMBERS" && <Members />}
    </section>
  );
};

export default GroupDetail;
