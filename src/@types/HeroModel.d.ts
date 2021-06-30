type HeroType = {
  id: string;
  name: string;
};

interface HeroModel {
  avatar_url: string;
  description: string;
  full_name: string;
  id: string;
  type: HeroType;
}
interface HeroesArrayModel {
  heroesArray: HeroModel[];
}
