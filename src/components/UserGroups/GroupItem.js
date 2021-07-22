import { useContext } from "react";
import { fetchActiveGroup } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import GroupsContext from "../../store/groups-context";
import Card from "../UI/Card";
import classes from "./GroupItem.module.css";

const GroupItem = (props) => {
  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);

  const groupId = props.groupId;

  const setActiveGroupHandler = async () => {
    const token = authCtx.token;
    const activeGroup = await fetchActiveGroup(token, groupId);
    groupsCtx.setGroup(activeGroup);
  };

  return (
    <Card className={classes.groupItem} onClick={setActiveGroupHandler}>
      <h3>{props.groupName}</h3>
    </Card>
  );
};

export default GroupItem;
