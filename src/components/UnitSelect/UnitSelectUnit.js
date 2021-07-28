import { useContext, useRef } from "react";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";

import classes from "./UnitSelectUnit.module.css";
import { deleteUnit } from "../../firebase-api/firebase-api";

const UnitSelectUnit = (props) => {
  const authCtx = useContext(AuthContext);
  const unitObjRef = useRef(props.unitObj);
  console.log(unitObjRef);
  const addUnitHandler = () => {
    const newUnitObj = JSON.parse(JSON.stringify(unitObjRef));

    newUnitObj.current.id = Math.random();
    console.log(newUnitObj);
    authCtx.addUnit(newUnitObj);
  };

  const deleteHandler = async (e) => {
    e.stopPropagation();
    const userId = authCtx.userId;
    const token = authCtx.token;
    const unitType = unitObjRef.current.unitType;
    const unitId = unitObjRef.current.id;
    await deleteUnit(userId, token, unitType, unitId);
  };
  return (
    <Card className={classes.unit} onClick={addUnitHandler}>
      <div className={classes.unitname}>
        <h3>{props.name}</h3>
        <div onClick={deleteHandler}>delete</div>
      </div>
    </Card>
  );
};

export default UnitSelectUnit;
