import { NavLink } from "react-router-dom";
import { useContext } from "react";
import classes from "./Navbar.module.css";
import NotificationsContext from "../../store/notifications-context";
import Notification from "../UI/Notification";
import sigmarSquare from "../../assets/sigmar-square.png";

const Navbar = () => {
  const notificationsCtx = useContext(NotificationsContext);
  const isNotifications = notificationsCtx.isNotifications;

  return (
    <nav className={classes.navbar}>
      <img
        className={classes.sigmarSquare}
        src={sigmarSquare}
        alt="age of sigmar square"
      />
      <div className={classes.title}>Age of Sigmar Companion</div>
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
            {isNotifications && (
              <Notification className={classes.notification} />
            )}
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/chat" activeClassName={classes.active}>
            Chat
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
