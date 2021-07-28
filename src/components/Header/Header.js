import classes from "./Header.module.css";
import sigmarLogo from "../../assets/sigmarLogo.png";
import Tracker from "./Tracker";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.topbar}>
        <Tracker trackType={"CP"} />
        <img src={sigmarLogo} alt="age of sigmar Logo" />
        <Tracker trackType={"VP"} />
      </div>
      {/* <h2>Army Tracker</h2> */}
    </div>
  );
};

export default Header;
