import * as React from "react";
import { getSingleHero } from "../../Api";

const HeroView: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [heroInfo, setHeroInfo] = React.useState<HeroModel>({
    avatar_url: "",
    description: "",
    full_name: "",
    id: "",
    type: { id: "", name: "" }
  });
  const idParam = window.location.pathname;

  React.useEffect(() => {
    getSingleHero(idParam.slice(1)).then(result => setHeroInfo(result));
  }, []);
  React.useEffect(() => {
    heroInfo.id.length !== 0 ? setLoading(false) : setLoading(true);
  }, [heroInfo]);

  return (
    <div>
      <p>{heroInfo.avatar_url}</p>
      <p>{heroInfo.full_name}</p>
      <p>{heroInfo.description}</p>
      <p>{heroInfo.type.name}</p>
    </div>
  );
};

export default HeroView;
