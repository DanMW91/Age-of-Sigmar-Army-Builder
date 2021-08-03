import classes from "./BattalionSmallSquare.module.css";
import Card from "../UI/Card";
const BattalionSmallSquare = (props) => {
  return (
    <Card
      className={`${classes.smallSquare} ${
        props.required ? classes.required : classes.optional
      }`}
    >
      {props.unitType}
    </Card>
  );
};

export default BattalionSmallSquare;
