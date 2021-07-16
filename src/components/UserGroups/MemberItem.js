import Card from "../UI/Card";
import classes from "./MemberItem.module.css";

const MemberItem = (props) => {
  return <Card className={classes.memberItem}>{props.userName}</Card>;
};

export default MemberItem;
