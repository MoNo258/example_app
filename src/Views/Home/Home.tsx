import _ from "lodash";
import React from "react";
import { List } from "semantic-ui-react";
import { getHeroes } from "../../Api";
import ButtonComponent from "../../Components/ButtonComponent";
import ListItem from "../../Components/ListItem";
import SkeletonList from "../../Components/SkeletonList";

const Home: React.FC = () => {
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

  return (
    <div>
      <ButtonComponent isIcon buttonText="Add hero" buttonColor="green" />
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
              />
            );
          })}
        </List>
      )}
    </div>
  );
};

export default Home;
