import Modal from "../../UI/Modal";
import classes from "./ArmyListModal.module.css";

const ArmyListModal = (props) => {
  return (
    <Modal className={classes.armyListModal} onCloseModal={props.onCloseModal}>
      <div className={classes.army}>
        <div className={classes.userName}>{props.army1User}'s Army:</div>
        <div>{props.army1}</div>
      </div>
      <div className={classes.army}>
        <div className={classes.userName}>{props.army2User}'s Army :</div>{" "}
        <div>{props.army2}</div>
      </div>
    </Modal>
  );
};

export default ArmyListModal;
