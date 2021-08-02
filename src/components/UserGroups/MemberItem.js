import Card from "../UI/Card";
import classes from "./MemberItem.module.css";

const MemberItem = (props) => {
  return (
    <Card className={classes.memberItem}>
      {props.userName}
      {props.admin && <div className={classes.admin}>admin</div>}
    </Card>
  );
};

export default MemberItem;
