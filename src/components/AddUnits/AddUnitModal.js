import { useState, useRef, useContext } from "react";
import { storeNewUnit } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";
import classes from "./AddUnitModal.module.css";
import UnitSelect from "../UnitSelect/UnitSelect";

// let unitObj = { type: "", unit: {} };

const AddUnitModal = (props) => {
  const [formState, setFormState] = useState("NO-FORM");
  const authCtx = useContext(AuthContext);

  const unitObj = useRef({
    type: "",
    unit: {},
  });
  const addNewUnitHandler = () => {
    setFormState("STATS-FORM");
  };

  const onSubmitStatsFormHandler = (e) => {
    e.preventDefault();
    const newUnitObj = {
      name: e.target.name.value,
      id: Math.random(),
      inBattalion: "",
      warscrollPath: e.target.warscrollPath.value,
      stats: {
        save: e.target.save.value,
        move: e.target.move.value,
        wounds: e.target.move.value,
        bravery: e.target.bravery.value,
      },
      attacks: [],
      unitType: e.target.type.value.toLowerCase(),
    };

    unitObj.current = {
      type: e.target.type.value.toLowerCase(),
      unit: { ...newUnitObj },
    };

    setFormState("ATTACKS-FORM");
  };

  const onAddAttackHandler = (e) => {
    e.preventDefault();

    unitObj.current.unit.attacks.push({
      range: e.target.parentElement.range.value,
      attacks: e.target.parentElement.attacks.value,
      toHit: e.target.parentElement.toHit.value,
      toWound: e.target.parentElement.toWound.value,
      rend: e.target.parentElement.rend.value,
      damage: e.target.parentElement.damage.value,
    });
    e.target.parentElement.reset();
  };

  const onSubmitAttacksHandler = (e) => {
    // units.addUnit(unitObj.current.unit, unitObj.current.type);
    const userId = authCtx.userId;
    const token = authCtx.token;
    const unit = unitObj.current.unit;
    const unitType = unitObj.current.type;

    authCtx.addUnit(unitObj);
    storeNewUnit(userId, token, unit, unitType);
  };

  return (
    <Modal className={classes.modal} onCloseModal={props.onCloseModal}>
      {formState === "NO-FORM" && (
        <>
          <div className={classes.button} onClick={addNewUnitHandler}>
            Add New Unit
          </div>
          <UnitSelect />
        </>
      )}

      {formState === "STATS-FORM" && (
        <form onSubmit={onSubmitStatsFormHandler} className={classes.form}>
          <label htmlFor="type">Unit Type:</label>
          <select id="type">
            <option>Leaders</option>
            <option>Battleline</option>
            <option>Artillery</option>
            <option>Monsters</option>
            <option>Behemoths</option>
            <option>Other</option>
          </select>
          <label htmlFor="warscrollPath">Warscroll URL:</label>
          <input id="warscrollPath" type="text" />
          <label htmlFor="name">Unit Name:</label>
          <input id="name" type="text" required />
          <label htmlFor="move">Move:</label>
          <input id="move" type="number" required />
          <label htmlFor="wounds">Wounds:</label>
          <input id="wounds" type="number" required />
          <label htmlFor="save">Save:</label>
          <input id="save" type="number" required />
          <label htmlFor="move">Bravery</label>
          <input id="bravery" type="number" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {formState === "ATTACKS-FORM" && (
        <form onSubmit={props.onAddUnit} className={classes.form}>
          <label htmlFor="range">Range:</label>
          <input id="range" type="number" />
          <label htmlFor="attacks">Attacks:</label>
          <input id="attacks" type="text" />
          <label htmlFor="toHit">To Hit:</label>
          <input id="toHit" type="number" />
          <label htmlFor="toWound">To Wound:</label>
          <input id="toWound" type="number" />
          <label htmlFor="rend">Rend</label>
          <input id="rend" type="number" />
          <label htmlFor="damage">Damage</label>
          <input id="damage" type="text" />
          <button onClick={onAddAttackHandler}>Add Attack</button>
          <button type="submit" onClick={onSubmitAttacksHandler}>
            Finished
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AddUnitModal;
