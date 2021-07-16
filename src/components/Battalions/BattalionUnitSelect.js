import produce from "immer";
import React from "react";
import Card from "../UI/Card";
import BattalionUnitContainer from "./BattalionUnitContainer";
import AuthContext from "../../store/auth-context";
import classes from "./BattalionUnitSelect.module.css";
import {
  useContext,
  useLayoutEffect,
  useReducer,
  useCallback,
  useState,
  useRef,
} from "react";

const battalionReducer = produce((draft, action) => {
  switch (action.type) {
    case "REFRESH-BATTALION":
      return action.val;
    case "ADD-UNIT":
      if (
        draft[`${action.unitType}`].requiredFilled <
        draft[`${action.unitType}`].required
      ) {
        draft[`${action.unitType}`].requiredFilled++;
        break;
      }
      if (
        draft[`${action.unitType}`].optionalFilled <
        draft[`${action.unitType}`].optional
      ) {
        draft[`${action.unitType}`].optionalFilled++;
      }

      break;
    case "REMOVE-UNIT":
      if (draft[`${action.unitType}`].optionalFilled > 0) {
        draft[`${action.unitType}`].optionalFilled--;
        break;
      }
      if (draft[`${action.unitType}`].requiredFilled > 0) {
        draft[`${action.unitType}`].requiredFilled--;
      }

      break;
    default:
      throw new Error("invalid action in reducer");
  }
});

const BattalionUnitSelect = React.forwardRef((props, ref) => {
  const battalion = props.battalion;
  const authCtx = useContext(AuthContext);
  const [showAddBattalion, setShowAddBattalion] = useState(false);

  const tempBattalionUnits = useRef([]);

  const initBattalionState = useCallback(() => {
    const battalionObj = {};

    if (battalion.units.commanders) {
      battalionObj.commanders = {
        required: battalion.units.commanders.required,
        optional: battalion.units.commanders.optional,
        requiredFilled: 0,
        optionalFilled: 0,
      };
    }

    if (battalion.units.leaders) {
      battalionObj.leaders = {
        required: battalion.units.leaders.required,
        optional: battalion.units.leaders.optional,
        requiredFilled: 0,
        optionalFilled: 0,
      };
    }
    if (battalion.units.troops) {
      battalionObj.troops = {
        required: battalion.units.troops.required,
        optional: battalion.units.troops.optional,
        requiredFilled: 0,
        optionalFilled: 0,
      };
    }
    if (battalion.units.monsters) {
      battalionObj.monsters = {
        required: battalion.units.monsters.required,
        optional: battalion.units.monsters.optional,
        requiredFilled: 0,
        optionalFilled: 0,
      };
    }
    if (battalion.units.artillery) {
      battalionObj.artillery = {
        required: battalion.units.artillery.required,
        optional: battalion.units.artillery.optional,
        requiredFilled: 0,
        optionalFilled: 0,
      };
    }
    setShowAddBattalion(false);
    return battalionObj;
  }, [
    battalion.units.artillery,
    battalion.units.commanders,
    battalion.units.leaders,
    battalion.units.monsters,
    battalion.units.troops,
  ]);

  const [battalionState, dispatchBattalionState] = useReducer(
    battalionReducer,
    {},
    initBattalionState
  );

  useLayoutEffect(() => {
    let statusArr = [];
    const batKeys = Object.keys(battalionState);

    batKeys.forEach((key) => {
      statusArr.push(
        battalionState[`${key}`].required ===
          battalionState[`${key}`].requiredFilled
          ? true
          : false
      );
    });

    if (statusArr.every((status) => status === true)) {
      setShowAddBattalion(true);
    }
    if (statusArr.includes(false) && showAddBattalion === true) {
      setShowAddBattalion(false);
    }
  }, [battalionState, showAddBattalion]);

  useLayoutEffect(() => {
    dispatchBattalionState({
      type: "REFRESH-BATTALION",
      val: initBattalionState(),
    });
  }, [battalion, initBattalionState]);

  const toggleUnitHandler = (unitObj, unit, action) => {
    if (action === "ADD") {
      tempBattalionUnits.current.push(unitObj);
      dispatchBattalionState({
        type: "ADD-UNIT",
        unitType: unit,
      });
    }
    if (action === "REMOVE") {
      tempBattalionUnits.current = tempBattalionUnits.current.filter(
        (unit) => unit.id !== unitObj.id
      );
      dispatchBattalionState({
        type: "REMOVE-UNIT",
        unitType: unit,
      });
    }
  };

  const addBattalionHandler = () => {
    authCtx.addBattalion(tempBattalionUnits.current, battalion.name);
  };

  return (
    <Card className={classes.battalionsUnitsContainer}>
      <div className={classes.containerheader}>
        <h2 ref={ref}>{battalion.name}</h2>

        <div className={classes.battalionFulfillment}>
          {battalionState.commanders && (
            <span>{`Commanders: required ${battalionState.commanders.requiredFilled}/${battalionState.commanders.required} optional ${battalionState.commanders.optionalFilled}/${battalionState.commanders.optional}`}</span>
          )}
          {battalionState.leaders && (
            <span>{`   Leaders: required ${battalionState.leaders.requiredFilled}/${battalionState.leaders.required} optional ${battalionState.leaders.optionalFilled}/${battalionState.leaders.optional}`}</span>
          )}
          {battalionState.troops && (
            <span>{`   Troops: required ${battalionState.troops.requiredFilled}/${battalionState.troops.required} optional ${battalionState.troops.optionalFilled}/${battalionState.troops.optional}`}</span>
          )}
          {battalionState.monsters && (
            <span>{`   Monsters: required ${battalionState.monsters.requiredFilled}/${battalionState.monsters.required} optional ${battalionState.monsters.optionalFilled}/${battalionState.monsters.optional}`}</span>
          )}
          {battalionState.artillery && (
            <span>{`   Artillery: required ${battalionState.artillery.requiredFilled}/${battalionState.artillery.required} optional ${battalionState.artillery.optionalFilled}/${battalionState.artillery.optional}`}</span>
          )}
        </div>
      </div>
      {authCtx.userArmy.units?.leaders[1] &&
        (battalionState?.leaders || battalionState?.commanders) && (
          <BattalionUnitContainer
            battalionObj={battalionState}
            battalionName={battalion.name}
            containerType={"Leaders"}
            onToggleUnit={toggleUnitHandler}
          />
        )}
      {authCtx.userArmy.units?.battleline[1] && battalionState?.troops && (
        <BattalionUnitContainer
          battalionObj={battalionState}
          battalionName={battalion.name}
          containerType={"Troops"}
          onToggleUnit={toggleUnitHandler}
        />
      )}
      {authCtx.userArmy.units?.monsters[1] && battalionState?.monsters && (
        <BattalionUnitContainer
          battalionObj={battalionState}
          battalionName={battalion.name}
          containerType={"Monsters"}
          onToggleUnit={toggleUnitHandler}
        />
      )}
      {authCtx.userArmy.units?.artillery[1] && battalionState?.artillery && (
        <BattalionUnitContainer
          battalionObj={battalionState}
          battalionName={battalion.name}
          containerType={"Artillery"}
          onToggleUnit={toggleUnitHandler}
        />
      )}
      {showAddBattalion && (
        <div onClick={addBattalionHandler} className={classes.button}>
          <h3>Add Battalion</h3>
        </div>
      )}
    </Card>
  );
});

export default BattalionUnitSelect;
