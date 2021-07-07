import { useState, useContext } from "react";
import Header from "../Header/Header";
import AddUnitModal from "../AddUnits/AddUnitModal";
import AuthContext from "../../store/store";
import ActiveBattalionsContainer from "../ActiveBattalions/ActiveBattalionsContainer";

// import PhaseWindow from "./components/Phase/PhaseWindow";

// import AllegienceContainer from "../Allegience/AllegienceContainer";
import UnitContainer from "../UnitContainer/UnitContainer";
import UnitSelect from "../UnitSelect/UnitSelect";

const ArmyList = () => {
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const authCtx = useContext(AuthContext);
  const units = authCtx.userArmy.units;
  const showBattalions = authCtx.userArmy?.activeBattalions[1] ? true : false;

  const onAddUnitHandler = (e) => {
    e.preventDefault();
    setShowAddUnitModal(false);
  };
  const onOpenAddUnitModalHandler = () => {
    setShowAddUnitModal(true);
  };

  const onCloseModalHandler = () => {
    setShowAddUnitModal(false);
  };

  return (
    <>
      {showAddUnitModal && (
        <AddUnitModal
          onCloseModal={onCloseModalHandler}
          onAddUnit={onAddUnitHandler}
        />
      )}

      <Header onOpenAddUnitModal={onOpenAddUnitModalHandler} />
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
