import { useState, useContext, useEffect, useLayoutEffect } from "react";
import classes from "./Army.module.css";
import Header from "../components/Header/Header";
import ArmyList from "../components/ArmyList/ArmyList";
import AddUnitModal from "../components/AddUnits/AddUnitModal";
import ArmiesModal from "../components/ArmiesModal/ArmiesModal";
import AuthContext from "../store/auth-context";

const Army = () => {
  const authCtx = useContext(AuthContext);
  const [armyLoaded, setArmyLoaded] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showArmiesModal, setShowArmiesModal] = useState(false);
  const [armyName, setArmyName] = useState("");

  useLayoutEffect(() => {
    if (armyLoaded) {
      setArmyName(authCtx.userArmy.armyName);
    }
  }, [authCtx.userArmy.armyName, armyLoaded]);

  useEffect(() => {
    setArmyLoaded(authCtx.armyLoaded);
  }, [authCtx.armyLoaded]);

  const onAddUnitHandler = (e) => {
    e.preventDefault();
    setShowAddUnitModal(false);
  };

  const openAddUnitModalHandler = () => {
    setShowAddUnitModal(true);
  };

  const onCloseModalHandler = () => {
    setShowAddUnitModal(false);
    setShowArmiesModal(false);
  };

  const openArmiesModalHandler = () => {
    setShowArmiesModal(true);
  };

  return (
    <>
      {showAddUnitModal && (
        <AddUnitModal
          onCloseModal={onCloseModalHandler}
          onAddUnit={onAddUnitHandler}
        />
      )}

      <Header />

      <section className={classes.armyContainer}>
        <div className={classes.buttonContainer}>
          <div className={classes.button} onClick={openArmiesModalHandler}>
            <h4>Select Army</h4>
          </div>
          {armyLoaded && (
            <div className={classes.button} onClick={openAddUnitModalHandler}>
              <h4>Add Unit</h4>
            </div>
          )}
        </div>
        {armyLoaded && <h2>{armyName}</h2>}

        {showArmiesModal && <ArmiesModal onCloseModal={onCloseModalHandler} />}

        {armyLoaded && <ArmyList />}
      </section>
    </>
  );
};

export default Army;
