import Modal from "../../UI/Modal";
import classes from "./ArmyListModal.module.css";

const ArmyListModal = (props) => {
  return (
    <Modal className={classes.armylistModal} onCloseModal={props.onCloseModal}>
      <div className={classes.army}>
        {props.army1User}'s Army : {props.army1}
      </div>
      <div className={classes.army}>
        {props.army2User}'s Army : {props.army2}
      </div>
    </Modal>
  );
};

export default ArmyListModal;
