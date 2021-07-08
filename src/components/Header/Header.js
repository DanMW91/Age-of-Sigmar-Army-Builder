import {useState} from 'react'
import classes from "./Header.module.css";
import sigmarLogo from "../../assets/sigmarLogo.png";
import Tracker from "./Tracker";

const Header = (props) => {

const [displayingArmy, setDisplayingArmy] = useState(false)

const displayingArmyHandler = () => {
  setDisplayingArmy(true)
}

  return (
    <div className={classes.header}>
      <div className={classes.topbar}>
        <Tracker trackType={"CP"} />
        <img src={sigmarLogo} alt="age of sigmar Logo" />
        <Tracker trackType={"VP"} />
      </div>
      <h2>Army Tracker</h2>
      <div className={classes.button} onClick={displayingArmyHandler}>
        <h4>Select Army</h4>
      </div>
      {displayingArmy && 
      <div className={classes.button} onClick={props.onOpenAddUnitModal}>
        <h4>Add Unit</h4>
      </div>}
    </div>
  );
};

export default Header;
