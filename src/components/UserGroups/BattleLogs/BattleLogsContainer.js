import { useState } from "react";
import NewBattleModal from "./NewBattleModal";
import classes from "./BattleLogsContainer.module.css";

const BattleLogsContainer = () => {
  const [showLogModal, setShowLogModal] = useState(false);

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
