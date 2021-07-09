import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul>
        <li>
          <NavLink to="/army" activeClassName={classes.active}>
            Army
          </NavLink>
        </li>
        <li>
          <NavLink to="/battalions" activeClassName={classes.active}>
            Battalions
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups" activeClassName={classes.active}>
            Groups
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" activeClassName={classes.active}>
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
