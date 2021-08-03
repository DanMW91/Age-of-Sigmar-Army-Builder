import { useContext } from "react";
import { deleteArmy, retrieveArmy } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import classes from "./ArmiesList.module.css";

const ArmyItem = (props) => {
  const authCtx = useContext(AuthContext);

  const chooseArmyHandler = async () => {
    const armyId = props.armyId;
    const userId = authCtx.userId;
    const token = authCtx.token;

    const selectedArmy = await retrieveArmy(userId, token, armyId);

    authCtx.setArmy(selectedArmy);
  };

  const deleteArmyHandler = async (e) => {
    e.stopPropagation();
    const armyId = props.armyId;
    const userId = authCtx.userId;
    const token = authCtx.token;
    authCtx.setLoading(true);
    await deleteArmy(userId, token, armyId);
    if (authCtx.userArmy.armyId === armyId) {
      authCtx.unloadArmy();
    }
    authCtx.setLoading(false);
  };

  return (
    <Card className={classes.armyItem} onClick={chooseArmyHandler}>
      <h2>{props.armyName}</h2>
      <div className={classes.delete} onClick={deleteArmyHandler}>
        delete
      </div>
    </Card>
  );
};

const ArmiesList = (props) => {
  const armiesArray = Object.values(props.armies)
    .map((army) => Object.values(army))
    .flat();

  return (
    <div>
      <ul>
        {armiesArray.map((army) => (
          <ArmyItem
            key={army.armyId}
            armyId={army.armyId}
            armyName={army.newArmyName}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArmiesList;
