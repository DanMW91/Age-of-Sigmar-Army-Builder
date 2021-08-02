import Card from "../UI/Card";
import BattalionUnit from "./BattalionUnit";
import classes from "./BattalionUnitContainer.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const BattalionUnitContainer = (props) => {
  const authCtx = useContext(AuthContext);
  const userArmy = authCtx.userArmy.units;

  const onToggleUnitHandler = (unitObj, type, action) => {
    props.onToggleUnit(unitObj, type, action);
  };
  console.log();

  return (
    <Card className={classes.unitContainer}>
      <div className={classes.containerHeader}>
        <h2>{props.containerType}</h2>
      </div>
      {userArmy[
        `${
          props.containerType === "Troops"
            ? "battleline"
            : props.containerType.toLowerCase()
        }`
      ]
        .slice(1)
        .filter((unit) => !unit.inBattalion) //filter out units that are in battalions already
        .map((unit) => (
          <BattalionUnit
            key={unit.id}
            battalionObj={props.battalionObj}
            battalionName={props.battalionName}
            onToggleUnit={onToggleUnitHandler}
            unitObj={unit}
            type={
              props.containerType === "Troops"
                ? "battleline"
                : props.containerType.toLowerCase()
            }
          />
        ))}
      {props.otherPresent &&
        authCtx.userArmy?.units.other[1] &&
        userArmy.other
          .slice(1)
          .filter((unit) => !unit.inBattalion) //filter out units that are in battalions already
          .map((unit) => (
            <BattalionUnit
              key={unit.id}
              battalionObj={props.battalionObj}
              battalionName={props.battalionName}
              onToggleUnit={onToggleUnitHandler}
              unitObj={unit}
              type={"other"}
            />
          ))}
    </Card>
  );
};

export default BattalionUnitContainer;
