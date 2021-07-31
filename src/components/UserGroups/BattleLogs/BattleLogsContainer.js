import { useState, useContext, useLayoutEffect } from "react";
import GroupsContext from "../../../store/groups-context";
import AuthContext from "../../../store/auth-context";
import NewBattleModal from "./NewBattleModal";
import BattleLogNotificationsList from "./BattleLogNotificationsList";
import classes from "./BattleLogsContainer.module.css";
import { retrieveLogs } from "../../../firebase-api/firebase-api";

const BattleLogsContainer = (props) => {
  const [logs, setLogs] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);

  const token = authCtx.token;
  const currentGroupId = Object.values(groupsCtx.activeGroup)[0].groupId;

  useLayoutEffect(() => {
    (async () => {
      const logs = await retrieveLogs(currentGroupId, token);
      setLogs(logs);
    })();
  }, [currentGroupId, token]);

  const closeModalHandler = () => {
    setShowLogModal(false);
  };

  return (
    <section className={classes.battleLogsContainer}>
      {showLogModal && <NewBattleModal onCloseModal={closeModalHandler} />}
      {props.hasNotifications && <BattleLogNotificationsList />}
      <button onClick={() => setShowLogModal(true)}>Add Log</button>

      <div>logs here</div>
    </section>
  );
};

export default BattleLogsContainer;
