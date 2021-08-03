import { useState } from "react";
import ArmyListModal from "./ArmyListModal";
import Modal from "../../UI/Modal";
import classes from "./BattleViewModal.module.css";

const BattleViewModal = (props) => {
  const [showArmies, setShowArmies] = useState(false);
  const [hideLog, setHideLog] = useState(false);
  console.log(props.log.armyList1);
  console.log(props.log.armyList2);
  const openArmyModalHandler = () => {
    setShowArmies(true);
    setHideLog(true);
  };

  const closeArmyModalHandler = () => {
    setShowArmies(false);
    setHideLog(false);
  };

  return (
    <>
      {!hideLog && (
        <Modal
          className={classes.battleViewModal}
          onCloseModal={props.onCloseModal}
        >
          <div className={classes.battleNameBox}>
            <h1>{props.log.battleName}</h1>
            <div className={classes.date}>{props.log.date}</div>
            <h2>Winner:</h2>
            <h2>{props.log.winner}</h2>
          </div>

          <div className={classes.info}>
            {props.log.yourName} vs. {props.log.opponentName}
          </div>

          <div className={classes.info}>Battleplan: {props.log.battleplan}</div>
          <div className={classes.info}>Points: {props.log.points}</div>
          <div className={`${classes.info} ${classes.scoresBox}`}>
            <h3>Scores</h3>
            <div className={classes.bothScores}>
              <div>
                {props.log.yourName}: {props.log.yourScore}
              </div>
              <div>
                {props.log.opponentName}: {props.log.opponentScore}
              </div>
            </div>
          </div>
          <button onClick={() => openArmyModalHandler()}>Army Lists</button>
        </Modal>
      )}
      {showArmies && (
        <ArmyListModal
          className={classes.armyListModal}
          army1={props.log.armyList1}
          army1User={props.log.yourName}
          army2={props.log.armyList2}
          army2User={props.log.opponentName}
          onCloseModal={closeArmyModalHandler}
        />
      )}
    </>
  );
};

export default BattleViewModal;
