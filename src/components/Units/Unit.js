import { useState, useContext } from "react";
import AuthContext from "../../store/store";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import UnitStats from "./UnitStats";
import UnitAttacks from "./UnitAttacks";
import classes from "./Unit.module.css";

const Unit = (props) => {
  const [displayWarscrollModal, setDisplayWarscrollModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const onDisplayWarscrollHandler = () => {
    setDisplayWarscrollModal(true);
  };

  const onCloseModalHandler = () => {
    setDisplayWarscrollModal(false);
  };

  const onDeleteUnitHandler = (e) => {
    e.stopPropagation();
    if (props.inBattalion)
      return alert(
        "Cannot delete unit if it's in a Battalion. Please delete Battalion first!"
      );
    authCtx.deleteUnit(props.unitType.toLowerCase(), props.id);
  };

  return (
    <>
      {displayWarscrollModal && (
        <Modal
          className={classes.warscrollmodal}
          onCloseModal={onCloseModalHandler}
        >
          <iframe
            title="warscroll"
            className={classes.warscroll}
            src={props.warscrollPath}
            alt=""
          />
        </Modal>
      )}
      <Card className={classes.unit} onClick={onDisplayWarscrollHandler}>
        <div className={classes.unitname}>
          <h2>{props.name}</h2>
        </div>
        <div className={classes.unitattributes}>
          <UnitStats stats={props.stats} />
          <UnitAttacks attacks={props.attacks} />
        </div>
        <div className={classes.delete} onClick={onDeleteUnitHandler}>
          X
        </div>
      </Card>
    </>
  );
};

export default Unit;
