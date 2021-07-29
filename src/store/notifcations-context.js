import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { fetchNotifications } from "../firebase-api/firebase-api";
import AuthContext from "./auth-context";

const NotificationsContext = React.createContext({
  notifications: {},
});

export const NotificationsContextProvider = (props) => {
  const [inviteNotifications, setInviteNotifications] = useState(null);
  const [pendingLogNotifications, setPendingLogNotifications] = useState(null);
  const isNotifications =
    inviteNotifications || pendingLogNotifications ? true : false;

  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!authCtx.isLoggedIn) return;
    const userId = authCtx.userId;
    const token = authCtx.token;

    (async () => {
      const notifications = await fetchNotifications(token, userId);
      if (!notifications) return;
      const notificationsArray = Object.values(notifications);
      console.log(notificationsArray);

      const pendingLogs = notificationsArray.map((notif) =>
        Object.keys(notif)[0] === "pendingLog" ? notif : null
      );
      setPendingLogNotifications(pendingLogs);
    })();
  }, [authCtx.userId, authCtx.token, authCtx.isLoggedIn]);

  const contextValue = {
    inviteNotifications,
    pendingLogNotifications,
    isNotifications,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
