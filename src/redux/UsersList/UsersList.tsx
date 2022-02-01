import React from "react";
import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";
import ListItem from "../../Components/ListItem";
import NoMoreItems from "../../Components/NoMoreItems";
import { useGlobalDispatch, useGlobalState } from "../../helpers";

type UsersListProps = {
  propName?: string;
};
const UsersList: React.FC<UsersListProps> = () => {
  const dispatch = useGlobalDispatch();
  const usersArray = useGlobalState(state => state.usersList.usersArray);
  const isLoading = useGlobalState(state => state.usersList.loading);

  const history = useHistory();

  const [usersTotal, setUsersTotal] = React.useState<number>(0);
  const [isAll, setIsAll] = React.useState(false);
  const [noUsers, setNoUsers] = React.useState(false);

  // eslint-disable-next-line
  const [usersOrgs, setUsersOrgs] = React.useState<IUsersOrgs[]>([]);

  //   React.useEffect(() => {
  //     dispatch(UsersListAction.fetchUsers());
  //   }, []);

  //   React.useEffect(() => {
  //     getUsers().then(
  //       result => {
  //         setUsersArray(result);
  //         setUsersTotal(result.length);
  //         setLoading(false);
  //       },
  //       () => setLoading(false)
  //     );
  //     // getUsersOrgs();
  //   }, []);
  React.useEffect(() => {
    usersTotal === usersArray?.length && usersTotal !== 0
      ? setIsAll(true)
      : setIsAll(false);
    usersArray?.length === 0 || !usersArray
      ? setNoUsers(true)
      : setNoUsers(false);
  }, [usersTotal, usersArray]);

  //   const getUsersOrgs = (login: string) => {
  //     getUsersOrganizations(login).then(result => setUsersOrgs(result));
  //   };

  const showUser = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    login: string
  ) => {
    // getUsersOrgs(login);

    history.push(`/${login}`);
    // history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  };

  return (
    <List>
      {noUsers ? (
        <NoMoreItems information="There are no users! Let's add someone..." />
      ) : (
        usersArray &&
        usersArray.map((user: IUser) => {
          return (
            <ListItem
              key={user.id}
              avatarUrl={user.avatar_url}
              description={user.node_id}
              fullName={user.login}
              id={user.id.toString()}
              type={user.type}
              showUser={e => showUser(e, user.login)}
            />
          );
        })
      )}
      {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
    </List>
  );
};
UsersList.displayName = "UsersList";
export default UsersList;
