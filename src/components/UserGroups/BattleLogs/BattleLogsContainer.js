import { useState, useContext, useLayoutEffect, useCallback } from "react";
import GroupsContext from "../../../store/groups-context";
import AuthContext from "../../../store/auth-context";
import NewBattleModal from "./NewBattleModal";

import BattleLogItem from "./BattleLogItem";
import BattleLogNotificationsList from "./BattleLogNotificationsList";
import Card from "../../UI/Card";
import classes from "./BattleLogsContainer.module.css";
import { retrieveLogs } from "../../../firebase-api/firebase-api";

const BattleLogsContainer = (props) => {
  const [logs, setLogs] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);

  const token = authCtx.token;
  const currentGroupId = Object.values(groupsCtx.activeGroup)[0].groupId;

  const fetchLogs = useCallback(async () => {
    const logs = await retrieveLogs(currentGroupId, token);
    let logsArray = [];
    for (const key in logs) {
      logsArray.push(logs[key]);
    }

    setLogs(logsArray);
  }, [currentGroupId, token]);

  useLayoutEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const closeModalHandler = () => {
    setShowLogModal(false);
  };

  return (
    <Card className={classes.battleLogsContainer}>
      {showLogModal && <NewBattleModal onCloseModal={closeModalHandler} />}
      {props.hasNotifications && (
        <BattleLogNotificationsList refreshLogs={fetchLogs} />
      )}
      <button onClick={() => setShowLogModal(true)}>+ Add Log</button>
      <div className={classes.logTitle}>
        <h3>Battle Logs</h3>
      </div>
      <div className={classes.logsList}>
        {logs &&
          logs.map((log) => <BattleLogItem key={log.logKey} log={log} />)}
      </div>
    </Card>
  );
};

export default BattleLogsContainer;
