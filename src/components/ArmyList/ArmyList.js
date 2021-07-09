import { useContext } from "react";
import AuthContext from "../../store/store";
import ActiveBattalionsContainer from "../ActiveBattalions/ActiveBattalionsContainer";
// import PhaseWindow from "./components/Phase/PhaseWindow";
// import AllegienceContainer from "../Allegience/AllegienceContainer";
import UnitContainer from "../UnitContainer/UnitContainer";


const ArmyList = () => {
 

  const authCtx = useContext(AuthContext);
  const units = authCtx.userArmy.units;
  const showBattalions = authCtx.userArmy?.activeBattalions[1] ? true : false;

 

  

  return (
    <>
     
      {showBattalions && <ActiveBattalionsContainer />}
      {/* <AllegienceContainer containerType={"Allegience"} units={allegience} /> */}

      {units.leaders[1] && (
        <UnitContainer
          containerType={"Leaders"}
          units={units.leaders.slice(1)}
        />
      )}
      {units.battleline[1] && (
        <UnitContainer
          containerType={"Battleline"}
          units={units.battleline.slice(1)}
        />
      )}
      {units.artillery[1] && (
        <UnitContainer
          containerType={"Artillery"}
          units={units.artillery.slice(1)}
        />
      )}
      {(units.behemoths[1] || units.monsters[1]) && (
        <UnitContainer
          containerType={"Behemoths"}
          units={units.behemoths.slice(1).concat(units?.monsters.slice(1))}
        />
      )}
      {units.other[1] && (
        <UnitContainer containerType={"Other"} units={units.other.slice(1)} />
      )}
    </>
  );
};

export default ArmyList;
