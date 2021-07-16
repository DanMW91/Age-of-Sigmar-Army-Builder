import { GroupsContextProvider } from "../store/groups-context";
import UserGroupsMain from "../components/UserGroups/UserGroupsMain";

const Groups = () => {
  return (
    <GroupsContextProvider>
      <UserGroupsMain />
    </GroupsContextProvider>
  );
};

export default Groups;
