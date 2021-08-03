import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import classes from "./Navbar.module.css";
import GroupsContext from "../../store/groups-context";
import NotificationsContext from "../../store/notifications-context";
import Notification from "../UI/Notification";
import sigmarSquare from "../../assets/sigmar-square.png";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const history = useHistory();
  const groupsCtx = useContext(GroupsContext);
  const authCtx = useContext(AuthContext);
  const notificationsCtx = useContext(NotificationsContext);
  const isNotifications = notificationsCtx.isNotifications;

  const logoutHandler = () => {
    history.push("/login");
    authCtx.logout();
    groupsCtx.setGroup("");
  };

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
      <button className={classes.logout} onClick={logoutHandler}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
