import classes from "./BattalionSmallSquare.module.css";
import Card from "../UI/Card";
const BattalionSmallSquare = (props) => {
  return (
    <Card>
      <div
        className={`${classes.smallSquare} ${
          props.required ? classes.required : classes.optional
        }`}
      >
        {props.unitType}
      </div>
    </Card>
  );
};

export default BattalionSmallSquare;
