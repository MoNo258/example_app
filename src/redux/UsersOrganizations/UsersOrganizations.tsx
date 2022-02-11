import * as React from "react";
import { List } from "semantic-ui-react";
import NoMoreItems from "src/Components/NoMoreItems";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { UsersOrganizationsAction } from "./UsersOrganizations.slice";

type UsersOrganizationsProps = {
  user: string;
};
const UsersOrganizations: React.FC<UsersOrganizationsProps> = ({ user }) => {
  const dispatch = useGlobalDispatch();
  const usersOrgs = useGlobalState((state) => state.usersOrgsList.items);
  const isLoading = useGlobalState((state) => state.usersOrgsList.loading);

  React.useEffect(() => {
    dispatch(UsersOrganizationsAction.fetchOrganizations(user));
  }, [user]);

  console.log("usersOrgs", usersOrgs);
  console.log("isLoading", isLoading);

  return (
    <List>
      <List.Header>User's organizations names:</List.Header>
      <List.Item as="ol">
        {usersOrgs.map((org: IUsersOrgs) => {
          return (
            <List.Item as="li" value="-" key={org.id}>
              {org.login}
            </List.Item>
          );
        })}
      </List.Item>
      {usersOrgs.length === 0 && (
        <NoMoreItems information="There are no organizations listed for this user..." />
      )}
    </List>
  );
};

UsersOrganizations.displayName = "UsersOrganizations";
export default UsersOrganizations;
