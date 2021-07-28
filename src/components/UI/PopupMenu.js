import { useState } from "react";
import classes from "./PopupMenu.module.css";

const PopupMenu = (props) => {
  const [isHidden, setIsHidden] = useState(props.isHidden);
  const position = props.position;

  return (
    <div className={classes.menu} style={styles}>
      <ul className={classes.optionsList}>
        <li>option 1</li>
        <li>option 2</li>
        <li>option 3</li>
      </ul>
    </div>
  );
};

export default PopupMenu;
