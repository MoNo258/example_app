import * as React from "react";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { UsersOrganizationsAction } from "./UsersOrganizations.slice";

const UsersOrganizations: React.FC = () => {
  const dispatch = useGlobalDispatch();
  const usersOrgs = useGlobalState(state => state.usersOrgsList.items);
  const isLoading = useGlobalState(state => state.usersOrgsList.loading);
  const [userName, setUserName] = React.useState("mojombo");

  React.useEffect(() => {
    dispatch(UsersOrganizationsAction.fetchOrganizations(userName));
  }, [userName]);

  console.log("usersOrgs", usersOrgs);
  console.log("isLoading", isLoading);

  return <div>This is UsersOrganizations Component</div>;
};

UsersOrganizations.displayName = "UsersOrganizations";
export default UsersOrganizations;
