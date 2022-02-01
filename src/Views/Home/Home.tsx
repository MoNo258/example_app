import _ from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import { UsersList, UsersListAction } from "src/redux";
import styled from "styled-components";
import { addSingleUser } from "../../Api";
import SkeletonList from "../../Components/SkeletonList";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import AddUser from "../../Views/AddUser/AddUser";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const dispatch = useGlobalDispatch();
  const isLoading = useGlobalState(state => state.usersList.loading);
  const history = useHistory();

  // eslint-disable-next-line
  const [newUser, setNewUser] = React.useState({
    avatar_url: "",
    description: "",
    full_name: ""
  });
  // eslint-disable-next-line
  const [userAvatar, setUserAvatar] = React.useState<IUser["avatar_url"]>("");
  const [userDescription, setUserDescription] = React.useState<
    IUser["organizations_url"]
  >("");
  const [userFullName, setUserFullName] = React.useState<IUser["login"]>("");
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
    dispatch(UsersListAction.fetchUsers());
  }, []);
  // React.useEffect(() => {
  //   getUsers().then(
  //     result => {
  //       setUsersArray(result);
  //       setUsersTotal(result.length);
  //       setLoading(false);
  //     },
  //     () => setLoading(false)
  //   );
  //   // getUsersOrgs();
  // }, []);

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

  // const getUsersOrgs = (login: string) => {
  //   getUsersOrganizations(login).then(result => setUsersOrgs(result));
  // };
  const addUser = () => {
    setOpenModal(true);
  };
  // const showUser = (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   login: string
  // ) => {
  //   getUsersOrgs(login);
  //   history.push(`/${login}`);
  //   // history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  // };
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
      {isLoading ? manySkeletons : <UsersList />}
    </HomeStyled>
  );
};

export default Home;
