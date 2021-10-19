import React from 'react'
import Card from "../UI/Card";
import Unit from "../Units/Unit";
import classes from "./UnitContainer.module.css";

const UnitContainer = (props) => {
  const units = [...props.units];

  return (
    <Card className={classes.unitcontainer}>
      <div className={classes.containerheader}>
        <h2>{props.containerType}</h2>
      </div>
      {units.map((unit) => {
        return (
          <Unit
            key={unit.id}
            id={unit.id}
            warscrollPath={unit.warscrollPath}
            name={unit.name}
            attacks={unit.attacks}
            stats={unit.stats}
            type={props.containerType}
            unitType={unit.unitType}
            inBattalion={unit.inBattalion}
          />
        );
      })}
    </Card>
  );
};

export default UnitContainer;
