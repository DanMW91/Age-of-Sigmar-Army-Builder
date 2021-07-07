import Card from "../UI/Card";
import classes from "./BattalionUnit.module.css";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const BattalionUnit = (props) => {
  const [selected, setSelected] = useState(false);
  const [displayLeaderSelection, setDisplayLeaderSelection] = useState(null);

  const unitTypeRef = useRef();

  const curBattalionName = props.battalionName;

  const battalionObj = props.battalionObj;

  const disabledRef = useRef(false);
  const unitSpentRef = useRef();

  useLayoutEffect(() => {
    unitTypeRef.current = props.type === "battleline" ? "troops" : props.type;

    if (
      (!battalionObj.leaders || !battalionObj.leaders.required === 0) &&
      (unitTypeRef.current === "commanders" ||
        unitTypeRef.current === "leaders") &&
      battalionObj.commanders
    ) {
      unitTypeRef.current = "commanders";
    }

    disabledRef.current =
      battalionObj[`${unitTypeRef.current}`].requiredFilled ===
        battalionObj[`${unitTypeRef.current}`].required &&
      battalionObj[`${unitTypeRef.current}`].optionalFilled ===
        battalionObj[`${unitTypeRef.current}`].optional
        ? true
        : false;
  });

  useEffect(() => {
    setSelected(false);
  }, [curBattalionName]);

  const toggleSelectHandler = (e, typeBypass = false) => {
    if (typeBypass) {
      disabledRef.current = false;
    }

    if (!selected && disabledRef.current) {
      return;
    }

    if (!selected && typeBypass) {
      props.onToggleUnit(props.unitObj, typeBypass, "ADD");
      unitSpentRef.current = typeBypass;

      setSelected((prevState) => {
        return !prevState;
      });
      return;
    }

    if (!selected) {
      props.onToggleUnit(props.unitObj, unitTypeRef.current, "ADD");
      unitSpentRef.current = unitTypeRef.current;
    }
    if (selected) {
      props.onToggleUnit(props.unitObj, unitSpentRef.current, "REMOVE");
    }
    setSelected((prevState) => {
      return !prevState;
    });
  };

  const setLeaderCommanderHandler = (e) => {
    setDisplayLeaderSelection((prevState) => !prevState);
  };

  const chooseCommanderLeaderHandler = (e) => {
    e.stopPropagation();
    if (
      e.target.innerText === "Commander" &&
      battalionObj.commanders.requiredFilled ===
        battalionObj.commanders.required &&
      battalionObj.commanders.optionalFilled ===
        battalionObj.commanders.optional
    ) {
      return;
    }
    if (
      e.target.innerText === "Leader" &&
      battalionObj.leaders.requiredFilled === battalionObj.leaders.required &&
      battalionObj.leaders.optionalFilled === battalionObj.leaders.optional
    ) {
      return;
    }
    e.target.innerText === "Commander"
      ? (unitTypeRef.current = "commanders")
      : (unitTypeRef.current = "leaders");

    const type = e.target.innerText.toLowerCase() + "s";
    toggleSelectHandler(e, type);
    setDisplayLeaderSelection(null);
  };

  return (
    <Card
      className={selected ? classes.selectedUnit : classes.unit}
      onClick={
        (unitTypeRef.current === "leaders" ||
          unitTypeRef.current === "commanders") &&
        battalionObj.commanders &&
        battalionObj.leaders &&
        !selected
          ? setLeaderCommanderHandler
          : toggleSelectHandler
      }
    >
      <div
        className={
          displayLeaderSelection ? classes.leaderSelect : classes.hidden
        }
      >
        <span onClick={chooseCommanderLeaderHandler}>Commander</span>
        <span onClick={chooseCommanderLeaderHandler}>Leader</span>
      </div>

      <h3>{props.unitObj.name}</h3>
    </Card>
  );
};

export default BattalionUnit;
