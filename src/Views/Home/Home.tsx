import _ from "lodash";
import React from "react";
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
  const isLoading = useGlobalState((state) => state.usersList.loading);
  const [newUser, setNewUser] = React.useState({
    avatar_url: "",
    description: "",
    full_name: "",
  });
  const [userAvatar, setUserAvatar] = React.useState<IUser["avatar_url"]>("");
  const [userDescription, setUserDescription] =
    React.useState<IUser["organizations_url"]>("");
  const [userFullName, setUserFullName] = React.useState<IUser["login"]>("");
  const [typeId, setTypeId] = React.useState<UserType | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    dispatch(UsersListAction.fetchUsers());
  }, []);

  React.useEffect(() => {
    if (
      userAvatar.length > 0 &&
      userDescription.length > 0 &&
      userFullName.length > 0 &&
      !!typeId
    ) {
      setIsDisabled(false);
    }
  }, [userAvatar, userDescription, userFullName, typeId]);

  const addUser = () => {
    setOpenModal(true);
  };
  const saveUser = () => {
    addSingleUser(userAvatar, userDescription, userFullName, typeId).then(
      (result) => setNewUser(result)
    );
    setUserAvatar("");
    setUserDescription("");
    setUserFullName("");
    setTypeId(null);
    setOpenModal(false);
  };

  const manySkeletons = _.times(7, (i) => <SkeletonList key={i} />);

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
