import Card from "../UI/Card";
import UnitSelectUnit from "./UnitSelectUnit";
import classes from "./UnitSelectContainer.module.css";

const UnitSelectContainer = (props) => {
  const units = [...props.units];

  return (
    <Card className={classes.unitcontainer}>
      <div className={classes.containerheader}>
        <h2>{props.containerType}</h2>
      </div>
      {units.map((unit) => {
        return (
          <UnitSelectUnit
            onSetUnits={props.onSetUnits}
            key={unit.id}
            name={unit.name}
            unitObj={unit}
          />
        );
      })}
    </Card>
  );
};

export default UnitSelectContainer;
