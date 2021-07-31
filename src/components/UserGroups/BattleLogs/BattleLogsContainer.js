import { useState, useContext, useLayoutEffect } from "react";
import GroupsContext from "../../../store/groups-context";
import AuthContext from "../../../store/auth-context";
import NewBattleModal from "./NewBattleModal";
import BattleLogNotificationsList from "./BattleLogNotificationsList";
import classes from "./BattleLogsContainer.module.css";

const BattleLogsContainer = (props) => {
  const [showLogModal, setShowLogModal] = useState(false);

  const closeModalHandler = () => {
    setShowLogModal(false);
  };
  console.log(props);

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
