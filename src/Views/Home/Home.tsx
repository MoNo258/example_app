import _ from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";
import styled from "styled-components";
import { getHeroes } from "../../Api";
import ListItem from "../../Components/ListItem";
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

  React.useEffect(() => {
    getHeroes().then(result => setHeroesArray(result.data));
  }, []);
  React.useEffect(() => {
    heroesArray.length !== 0 ? setLoading(false) : setLoading(true);
  }, [heroesArray]);

  const manySkeletons = _.times(7, i => <SkeletonList key={i} />);
  const showHero = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  };
  const addHero = () => {
    console.log("add hero button clicked");
  };

  return (
    <>
      <HomeStyled className="home">
        <AddHero loading={loading} addHero={addHero} />
        {/* <ButtonComponent
          loading={loading}
          isIcon
          iconName="plus"
          buttonText="Add hero"
          buttonColor="green"
          onButtonClick={addHero}
        /> */}
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
          </List>
        )}
      </HomeStyled>
    </>
  );
};

export default Home;
