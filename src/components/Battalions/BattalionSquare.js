import { useState } from "react";
import BattalionSmallSquare from "./BattalionSmallSquare";

import Card from "../UI/Card";
import classes from "./BattalionSquare.module.css";

const BattalionSquare = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const units = props.units;
  const selectBattalionHandler = () => {
    props.onSelectBattalion(props.id);
  };

  return (
    <Card className={classes.battalionSquare} onClick={selectBattalionHandler}>
      <div className={classes.battalionName}>
        <h2>{props.name}</h2>
      </div>
      <div className={classes.battalionContent}>
        <div className={classes.unitRow}>
          {units.commanders &&
            [...Array(units.commanders.required)].map((commander) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Commander"}
                required={true}
              />
            ))}
          {units.commanders &&
            units.commanders.optional !== 0 &&
            [...Array(units.commanders.optional)].map((commander) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Commander"}
                required={false}
              />
            ))}
        </div>
        <div className={classes.unitRow}>
          {units.leaders &&
            [...Array(units.leaders.required)].map((leader) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Leader"}
                required={true}
              />
            ))}
          {units.leaders &&
            units.leaders.optional !== 0 &&
            [...Array(units.leaders.optional)].map((leader) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Leader"}
                required={false}
              />
            ))}
        </div>
        <div className={classes.unitRow}>
          {units.troops &&
            [...Array(units.troops.required)].map((troop) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Troops"}
                required={true}
              />
            ))}
          {units.troops &&
            units.troops.optional !== 0 &&
            [...Array(units.troops.optional)].map((troop) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Troops"}
                required={false}
              />
            ))}
        </div>
        <div className={classes.unitRow}>
          {units.monsters &&
            [...Array(units.monsters.required)].map((monster) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Monster"}
                required={true}
              />
            ))}
          {units.monsters &&
            units.monsters.optional !== 0 &&
            [...Array(units.monsters.optional)].map((monster) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Monster"}
                required={false}
              />
            ))}
        </div>
        <div className={classes.unitRow}>
          {units.artillery &&
            [...Array(units.artillery.required)].map((artillery) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Artillery"}
                required={true}
              />
            ))}
          {units.artillery &&
            units.artillery.optional !== 0 &&
            [...Array(units.artillery.optional)].map((artillery) => (
              <BattalionSmallSquare
                key={Math.random()}
                unitType={"Artillery"}
                required={false}
              />
            ))}
        </div>
      </div>

      <div className={classes.battalionBonuses}>
        <h3>
          <div className={showDetails ? classes.details : classes.hidden}>
            {props.textArray}
          </div>
          {props.bonuses.map((bonus, i) => (
            <span
              onMouseEnter={() => setShowDetails(true)}
              onMouseLeave={() => setShowDetails(false)}
            >
              {bonus}
              {bonus !== props.bonuses[props.bonuses.length - 1] && ", "}
            </span>
          ))}
        </h3>
      </div>
    </Card>
  );
};

export default BattalionSquare;
