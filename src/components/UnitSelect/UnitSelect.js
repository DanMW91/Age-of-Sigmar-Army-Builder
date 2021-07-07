import { useContext } from "react";
import AuthContext from "../../store/store";
import UnitSelectContainer from "./UnitSelectContainer";

const UnitSelect = (props) => {
  const authCtx = useContext(AuthContext);
  const units = authCtx.userArmy.allUnits;

  return (
    <div>
      {units.leaders[1] && (
        <UnitSelectContainer
          containerType={"Leaders"}
          units={units.leaders.slice(1)}
        />
      )}
      {units.battleline[1] && (
        <UnitSelectContainer
          containerType={"Battleline"}
          units={units.battleline.slice(1)}
        />
      )}
      {units.artillery[1] && (
        <UnitSelectContainer
          containerType={"Artillery"}
          units={units.artillery.slice(1)}
        />
      )}
      {(units.behemoths[1] || units.monsters[1]) && (
        <UnitSelectContainer
          containerType={"Behemoths"}
          units={units.behemoths.slice(1).concat(units?.monsters.slice(1))}
        />
      )}
      {units.other[1] && (
        <UnitSelectContainer
          containerType={"Other"}
          units={units.other.slice(1)}
        />
      )}
    </div>
  );
};

export default UnitSelect;
