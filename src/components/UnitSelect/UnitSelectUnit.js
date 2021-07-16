import { useContext, useRef } from "react";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";

import classes from "./UnitSelectUnit.module.css";

const UnitSelectUnit = (props) => {
  const authCtx = useContext(AuthContext);
  const unitObjRef = useRef(props.unitObj);

  const addUnitHandler = () => {
    const newUnitObj = JSON.parse(JSON.stringify(unitObjRef));

    newUnitObj.current.id = Math.random();
    console.log(newUnitObj);
    authCtx.addUnit(newUnitObj);
  };

  return (
    <Card className={classes.unit} onClick={addUnitHandler}>
      <div className={classes.unitname}>
        <h3>{props.name}</h3>
      </div>
    </Card>
  );
};

export default UnitSelectUnit;
