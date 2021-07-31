import React, {
  useState,
  useCallback,
  useContext,
  useLayoutEffect,
} from "react";
import {
  deleteLogNotification,
  fetchNotifications,
} from "../firebase-api/firebase-api";
import AuthContext from "./auth-context";
import GroupsContext from "./groups-context";

const NotificationsContext = React.createContext({
  pendingLogNotifications: null,
  isNotifications: null,
  groupsWithNotifications: null,
  currentGroupHasNotifications: null,
  deleteNotification: () => {},
});

export const NotificationsContextProvider = (props) => {
  const [inviteNotifications, setInviteNotifications] = useState(null);
  const [pendingLogNotifications, setPendingLogNotifications] = useState(null);
  const [groupsWithNotifications, setGroupsWithNotifications] = useState(null);
  const [currentGroupHasNotifications, setCurrentGroupHasNotifications] =
    useState(false);

  const authCtx = useContext(AuthContext);
  const groupsCtx = useContext(GroupsContext);

  const isNotifications =
    inviteNotifications || pendingLogNotifications ? true : false;

  const setNotifications = useCallback(async () => {
    const userId = authCtx.userId;
    const token = authCtx.token;
    const notifications = await fetchNotifications(token, userId);

    if (!notifications) {
      setCurrentGroupHasNotifications(false);
      setPendingLogNotifications(null);
      setGroupsWithNotifications(null);

      return;
    }
    const notificationsArray = Object.values(notifications);

    const pendingLogs = notificationsArray.map((notif) =>
      Object.keys(notif)[0] === "pendingLog" ? notif : null
    );

    const allGroupsWithNotifs = Object.values(notificationsArray).map(
      (notif) => Object.values(Object.values(notif)[0])[0].groupId
    );

    const uniqueGroupsWithNotifs = [...new Set(allGroupsWithNotifs)];

    setPendingLogNotifications(pendingLogs);
    setGroupsWithNotifications(uniqueGroupsWithNotifs);
  }, [authCtx.token, authCtx.userId]);

  useLayoutEffect(() => {
    if (!authCtx.isLoggedIn) return;

    setNotifications();
  }, [authCtx.userId, authCtx.token, authCtx.isLoggedIn, setNotifications]);

  useLayoutEffect(() => {
    if (!groupsCtx.activeGroup) return;

    const currentGroupId = Object.values(groupsCtx.activeGroup)[0].groupId;

    if (
      groupsWithNotifications &&
      groupsWithNotifications.includes(currentGroupId)
    ) {
      setCurrentGroupHasNotifications(true);
    } else {
      setCurrentGroupHasNotifications(false);
    }
  }, [groupsCtx.activeGroup, groupsWithNotifications]);

  const deleteNotificationHandler = async (notificationId) => {
    const userId = authCtx.userId;
    const token = authCtx.token;

    await deleteLogNotification(userId, token, notificationId);
    await setNotifications();
  };

  const contextValue = {
    inviteNotifications,
    pendingLogNotifications,
    isNotifications,
    groupsWithNotifications,
    currentGroupHasNotifications,
    deleteNotification: deleteNotificationHandler,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
