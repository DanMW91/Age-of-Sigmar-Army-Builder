import GroupList from "./GroupList";
import Card from "../UI/Card";
import classes from "./UserGroupsMain.module.css";

const UserGroupsMain = () => {
  return (
    <Card className={classes.card}>
      <section className={classes.mainContainer}>
        <div className={classes.groupsHeader}>My Groups</div>
        <div className={classes.groupsContent}>
          <GroupList />
        </div>
      </section>
    </Card>
  );
};

export default UserGroupsMain;
