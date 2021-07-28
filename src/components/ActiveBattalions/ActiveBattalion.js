import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ActiveBattalion.module.css";
import Card from "../UI/Card";
import { battalions } from "../Battalions/BattalionsMain";

const ActiveBattalion = (props) => {
  const authCtx = useContext(AuthContext);
  const [battalionUnits, setBattalionUnits] = useState([]);
  const [showDetails, setShowDetails] = useState();
  const [usedAbility, setUsedAbility] = useState(false);

  const allUnits = authCtx.userArmy.units;

  const currBattalionRef = useRef(
    battalions.filter((battalion) => battalion.name === props.battalionName)
  );

  const bonusesRef = useRef(currBattalionRef.current[0].bonuses);
  const bonusTextRef = useRef(currBattalionRef.current[0].textArray);

  useEffect(() => {
    const unitTypeArray = ["leaders", "battleline", "monsters", "artillery"];
    let unitsArray = [];
    unitTypeArray.forEach((unitType) =>
      allUnits[`${unitType}`].forEach((unit) => {
        if (
          unit.inBattalion &&
          unit.inBattalion.battalionId === props.battalionId
        ) {
          unitsArray.push(unit);
        }
      })
    );
    setBattalionUnits(unitsArray);
  }, [allUnits, props.battalionId]);

  const deleteBattalionHandler = () => {
    const unitTypeArr = [];
    battalionUnits.forEach((unit) => unitTypeArr.push(unit.unitType));
    const uniqueTypeArr = [...new Set(unitTypeArr)];

    const unitIds = battalionUnits.map((unit) => unit.id);

    authCtx.deleteBattalion(props.battalionId, uniqueTypeArr, unitIds);
  };

  return (
    <>
      <Card className={classes.activeBattalion}>
        <div className={classes.battalionName}>
          <h3>{props.battalionName}</h3>
        </div>
        <div className={classes.battalionContent}>
          <ul>
            {battalionUnits.map((unit) => (
              <li key={Math.random()}>{unit.name}</li>
            ))}
          </ul>
        </div>
        <div
          onClick={() => setUsedAbility((prevState) => !prevState)}
          className={
            usedAbility
              ? classes.battalionBonusesUsed
              : classes.battalionBonuses
          }
        >
          <h3>
            <div className={showDetails ? classes.details : classes.hidden}>
              {bonusTextRef.current}
            </div>
            {bonusesRef.current.map((bonus) => (
              <span
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
              >
                {bonus}
              </span>
            ))}
          </h3>
          <button onClick={deleteBattalionHandler}>Delete</button>
        </div>
      </Card>
    </>
  );
};

export default ActiveBattalion;
