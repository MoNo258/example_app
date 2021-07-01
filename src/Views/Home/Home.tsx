import _ from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";
import styled from "styled-components";
import { addSingleHero, getHeroes, getTypes } from "../../Api";
import ListItem from "../../Components/ListItem";
import NoMoreItems from "../../Components/NoMoreItems";
import SkeletonList from "../../Components/SkeletonList";
import AddHero from "../../Views/AddHero/AddHero";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [heroesArray, setHeroesArray] = React.useState<
    HeroesArrayModel["heroesArray"]
  >([]);
  const [heroesTotal, setHerosTotal] = React.useState<number>(0);
  const [isAll, setIsAll] = React.useState(false);
  const [noHeroes, setNoHeroes] = React.useState(false);
  // eslint-disable-next-line
  const [newHero, setNewHero] = React.useState({
    avatar_url: "",
    description: "",
    full_name: "",
    type: ""
  });
  const [heroTypes, setHeroTypes] = React.useState<HeroType[]>([]);
  const [heroAvatar, setHeroAvatar] = React.useState<HeroModel["avatar_url"]>(
    ""
  );
  const [heroDescription, setHeroDescription] = React.useState<
    HeroModel["description"]
  >("");
  const [heroFullName, setHeroFullName] = React.useState<
    HeroModel["full_name"]
  >("");
  const [heroId, setHeroId] = React.useState<HeroType["id"]>("");
  const [openModal, setOpenModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const optionsForSelect: OptionsForSelect[] = [
    {
      key: "",
      text: "",
      value: ""
    }
  ];
  heroTypes.map(hero => {
    optionsForSelect.push({
      key: hero.id,
      text: hero.name,
      value: hero.id
    });
    return optionsForSelect;
  });

  const onSelectChange = (
    e: React.SyntheticEvent<HTMLElement>,
    data
    // data: DropdownProps // I have no idea what kind of type data could have and so I left default any.
  ) => setHeroId(data.value);

  React.useEffect(() => {
    getHeroes().then(
      result => {
        setHeroesArray(result.data);
        setHerosTotal(result.total_count);
        setLoading(false);
      },
      () => setLoading(false)
    );
    getHeroTypes();
  }, []);
  React.useEffect(() => {
    heroesTotal === heroesArray.length && heroesTotal !== 0
      ? setIsAll(true)
      : setIsAll(false);
    heroesArray.length === 0 ? setNoHeroes(true) : setNoHeroes(false);
  }, [heroesTotal, heroesArray.length]);
  React.useEffect(() => {
    if (
      heroAvatar.length > 0 &&
      heroDescription.length > 0 &&
      heroFullName.length > 0 &&
      heroId.length > 0
    ) {
      setIsDisabled(false);
    }
  }, [heroAvatar, heroDescription, heroFullName, heroId]);

  const getHeroTypes = () => {
    getTypes().then(result => setHeroTypes(result));
  };
  const addHero = () => {
    setOpenModal(true);
  };
  const showHero = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  };
  const saveHero = () => {
    addSingleHero(
      heroAvatar,
      heroDescription,
      heroFullName,
      heroId
    ).then(result => setNewHero(result));
    setHeroAvatar("");
    setHeroDescription("");
    setHeroFullName("");
    setHeroId("");
    setOpenModal(false);
  };

  const manySkeletons = _.times(7, i => <SkeletonList key={i} />);

  return (
    <HomeStyled className="home">
      <AddHero
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        addHero={addHero}
        onAvatarChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHeroAvatar(e.target.value)
        }
        onNameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHeroFullName(e.target.value)
        }
        onSelectChange={onSelectChange}
        optionsForSelect={optionsForSelect}
        onDescriptionChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setHeroDescription(e.target.value)
        }
        saveHero={saveHero}
        isDisabled={isDisabled}
      />
      {loading ? (
        manySkeletons
      ) : (
        <List>
          {heroesArray.map(hero => {
            return (
              <ListItem
                key={hero.id}
                avatarUrl={hero.avatar_url}
                description={hero.description}
                fullName={hero.full_name}
                id={hero.id}
                type={hero.type}
                showHero={e => showHero(e)}
              />
            );
          })}
          {noHeroes && (
            <NoMoreItems information="There are no heroes in town! Add new hero, please..." />
          )}
          {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
        </List>
      )}
    </HomeStyled>
  );
};

export default Home;
