import BattalionSquare from "./BattalionSquare";
import BattalionUnitSelect from "./BattalionUnitSelect";
import Card from "../UI/Card";
import { useState, useRef, useEffect } from "react";
import classes from "./BattalionsMain.module.css";

export const battalions = [
  {
    id: "b1",
    name: "Warlord",
    units: {
      commanders: { required: 1, optional: 1 },
      leaders: { required: 2, optional: 2 },
      troops: { required: 1, optional: 1 },
    },
    bonuses: ["Magnificent", "Strategist"],
  },
  {
    id: "b2",
    name: "Battle Regiment",
    units: {
      commanders: { required: 1, optional: 0 },
      leaders: { required: 0, optional: 2 },
      troops: { required: 2, optional: 3 },
      monsters: { required: 0, optional: 1 },
      artillery: { required: 0, optional: 1 },
    },
    bonuses: ["Unified"],
  },
  {
    id: "b3",
    name: "Grand Battery",
    units: {
      leaders: { required: 1, optional: 0 },
      artillery: { required: 2, optional: 1 },
    },
    bonuses: ["Slayers"],
  },
  {
    id: "b4",
    name: "Vanguard",
    units: {
      leaders: { required: 1, optional: 0 },
      troops: { required: 1, optional: 2 },
    },
    bonuses: ["Swift"],
  },
  {
    id: "b5",
    name: "Linebreaker",
    units: {
      commanders: { required: 1, optional: 0 },

      monsters: { required: 2, optional: 1 },
    },
    bonuses: ["Expert"],
  },
  {
    id: "b6",
    name: "Command Entourage",
    units: {
      commanders: { required: 1, optional: 0 },
      leaders: { required: 2, optional: 1 },
    },
    bonuses: ["Strategist / Magnificent"],
  },
];

const BattalionsMain = () => {
  const [selectedBattalion, setSelectedBattalion] = useState("");
  const unitsRef = useRef();
  const firstUpdate = useRef(true);
  const selectBattalionHandler = (id) => {
    const newBattalion = battalions.filter((battalion) => battalion.id === id);

    setSelectedBattalion(newBattalion[0]);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      unitsRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedBattalion]);

  return (
    <>
      <Card className={classes.battalionsContainer}>
        <div className={classes.containerheader}>
          <h2>Battalions</h2>
        </div>
        <div className={classes.squareContainer}>
          <div className={classes.squareRow}>
            {battalions.map((battalion) => (
              <BattalionSquare
                key={battalion.id}
                id={battalion.id}
                name={battalion.name}
                units={battalion.units}
                bonuses={battalion.bonuses}
                onSelectBattalion={selectBattalionHandler}
              />
            ))}
          </div>
        </div>
      </Card>
      {selectedBattalion && (
        <BattalionUnitSelect battalion={selectedBattalion} ref={unitsRef} />
      )}
    </>
  );
};

export default BattalionsMain;
