import { useState, useContext, useLayoutEffect } from "react";
import GroupsContext from "../../../store/groups-context";
import AuthContext from "../../../store/auth-context";
import NewBattleModal from "./NewBattleModal";
import BattleLogNotifications from "./BattleLogNotifications";
import classes from "./BattleLogsContainer.module.css";
import { fetchNotifications } from "../../../firebase-api/firebase-api";

const BattleLogsContainer = () => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState();

  useLayoutEffect(() => {
    const userId = authCtx.userId;
    const token = authCtx.token;
    (async () => {
      const notifications = await fetchNotifications(token, userId);
      console.log(notifications);
    })();
  });

  const closeModalHandler = () => {
    setShowLogModal(false);
  };

  return (
    <section className={classes.battleLogsContainer}>
      {showLogModal && <NewBattleModal onCloseModal={closeModalHandler} />}

      <button onClick={() => setShowLogModal(true)}>Add Log</button>
      <div>logs here</div>
    </section>
  );
};

export default BattleLogsContainer;
