import _ from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";
import styled from "styled-components";
import { addSingleUser, getUsers, getUsersOrganizations } from "../../Api";
import ListItem from "../../Components/ListItem";
import NoMoreItems from "../../Components/NoMoreItems";
import SkeletonList from "../../Components/SkeletonList";
import AddUser from "../../Views/AddUser/AddUser";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [usersArray, setUsersArray] = React.useState<
    UsersArrayModel["usersArray"]
  >([]);
  const [usersTotal, setUsersTotal] = React.useState<number>(0);
  const [isAll, setIsAll] = React.useState(false);
  const [noUsers, setNoUsers] = React.useState(false);
  // eslint-disable-next-line
  const [newUser, setNewUser] = React.useState({
    avatar_url: "",
    description: "",
    full_name: ""
  });
  // eslint-disable-next-line
  const [usersOrgs, setUsersOrgs] = React.useState<IUsersOrgs[]>([]);
  const [userAvatar, setUserAvatar] = React.useState<UserModel["avatar_url"]>(
    ""
  );
  const [userDescription, setUserDescription] = React.useState<
    UserModel["organizations_url"]
  >("");
  const [userFullName, setUserFullName] = React.useState<UserModel["login"]>(
    ""
  );
  const [userId, setUserId] = React.useState<UserType>("");
  const [openModal, setOpenModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  // const optionsForSelect: OptionsForSelect[] = [
  //   {
  //     key: "",
  //     text: "",
  //     value: ""
  //   }
  // ];
  // usersOrgs.map(user => {
  //   optionsForSelect.push({
  //     key: user,
  //     text: user,
  //     value: user
  //   });
  //   return optionsForSelect;
  // });

  // const onSelectChange = (
  //   e: React.SyntheticEvent<HTMLElement>,
  //   data
  //   // data: DropdownProps // I have no idea what kind of type data could have and so I left default any.
  // ) => setUserId(data.value);

  React.useEffect(() => {
    getUsers().then(
      result => {
        setUsersArray(result);
        setUsersTotal(result.length);
        setLoading(false);
      },
      () => setLoading(false)
    );
    // getUsersOrgs();
  }, []);
  React.useEffect(() => {
    usersTotal === usersArray.length && usersTotal !== 0
      ? setIsAll(true)
      : setIsAll(false);
    usersArray.length === 0 ? setNoUsers(true) : setNoUsers(false);
  }, [usersTotal, usersArray.length]);
  React.useEffect(() => {
    if (
      userAvatar.length > 0 &&
      userDescription.length > 0 &&
      userFullName.length > 0 &&
      userId.length > 0
    ) {
      setIsDisabled(false);
    }
  }, [userAvatar, userDescription, userFullName, userId]);

  const getUsersOrgs = (login: string) => {
    getUsersOrganizations(login).then(result => setUsersOrgs(result));
  };
  const addUser = () => {
    setOpenModal(true);
  };
  const showUser = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    login: string
  ) => {
    getUsersOrgs(login);
    history.push(`/${login}`);
    // history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  };
  const saveUser = () => {
    addSingleUser(
      userAvatar,
      userDescription,
      userFullName,
      userId
    ).then(result => setNewUser(result));
    setUserAvatar("");
    setUserDescription("");
    setUserFullName("");
    setUserId("");
    setOpenModal(false);
  };

  const manySkeletons = _.times(7, i => <SkeletonList key={i} />);

  return (
    <HomeStyled className="home">
      <AddUser
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        addUser={addUser}
        onAvatarChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserAvatar(e.target.value)
        }
        onNameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserFullName(e.target.value)
        }
        // onSelectChange={onSelectChange}
        // optionsForSelect={optionsForSelect}
        onDescriptionChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setUserDescription(e.target.value)
        }
        saveUser={saveUser}
        isDisabled={isDisabled}
      />
      {loading ? (
        manySkeletons
      ) : (
        <List>
          {usersArray.map((user: UserModel) => {
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
          })}
          {noUsers && (
            <NoMoreItems information="There are no users! Let's add someone..." />
          )}
          {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
        </List>
      )}
    </HomeStyled>
  );
};

export default Home;
