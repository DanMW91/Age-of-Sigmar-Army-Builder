import Card from "../UI/Card";
import Allegience from "./Allegience";
import classes from "./AllegienceContainer.module.css";

const UnitContainer = (props) => {
  const units = [...props.units];

  return (
    <Card className={classes.unitcontainer}>
      <div className={classes.containerheader}>
        <h2>{props.containerType}</h2>
      </div>
      {units.map((unit) => {
        return <Allegience key={unit.id} warscrollPath={unit.warscrollPath} />;
      })}
    </Card>
  );
};

export default UnitContainer;
