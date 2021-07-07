import Phase from "./Phase";

import classes from "./PhaseWindow.module.css";

const PhaseWindow = () => {
  return (
    <div className={classes.phasewindow}>
      <Phase>Hero</Phase>
      <Phase>Move</Phase>
      <Phase>Shoot</Phase>
      <Phase>Combat</Phase>
      <Phase>Battleshock</Phase>
    </div>
  );
};

export default PhaseWindow;
