import { NavLink } from "react-router-dom";
import { useContext } from "react";
import classes from "./Navbar.module.css";
import NotificationsContext from "../../store/notifcations-context";

const Navbar = () => {
  const notificationsCtx = useContext(NotificationsContext);
  const isNotifications = notificationsCtx.isNotifications;

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
            {isNotifications && <div className={classes.notification}>!</div>}
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
