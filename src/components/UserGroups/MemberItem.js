import Card from "../UI/Card";
import classes from "./MemberItem.module.css";

const MemberItem = (props) => {
  return (
    <Card className={classes.memberItem}>
      <div className={classes.userName}> {props.userName}</div>

      {props.admin && <div className={classes.admin}>Admin</div>}
    </Card>
  );
};

export default MemberItem;
