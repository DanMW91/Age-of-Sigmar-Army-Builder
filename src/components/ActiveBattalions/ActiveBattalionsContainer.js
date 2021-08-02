import Card from "../UI/Card";
import classes from "./ActiveBattalionsContainer.module.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import ActiveBattalion from "./ActiveBattalion";

const ActiveBattalions = () => {
  const authCtx = useContext(AuthContext);
  const battalions = authCtx.userArmy.activeBattalions.slice(1);

  return (
    <Card className={classes.battalionsContainer}>
      <div className={classes.containerHeader}>
        <h2>Active Battalions</h2>
      </div>
      <div className={classes.activeBattalionsList}>
        {battalions.map((battalion) => {
          return (
            <ActiveBattalion
              battalionName={battalion.battalionName}
              battalionId={battalion.battalionId}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default ActiveBattalions;
