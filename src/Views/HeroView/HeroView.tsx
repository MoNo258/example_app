import * as React from "react";
import { useHistory } from "react-router-dom";
import { Breadcrumb, ButtonProps, Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import { deleteSingleHero, getSingleHero } from "../../Api";
import ButtonComponent from "../../Components/ButtonComponent";

export const HeroViewStyled = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  & .heroView_card {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .ui.card > .image {
      background: none;
      border-radius: 50% !important;
    }
    & .ui.card > .content,
    .ui.card > .extra {
      border-top: none;
    }
  }
`;

const HeroView: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [heroInfo, setHeroInfo] = React.useState<HeroModel>({
    avatar_url: "",
    description: "",
    full_name: "",
    id: "",
    type: { id: "", name: "" }
  });
  const idParam = window.location.pathname;
  const [isDeleted, setIsDeleted] = React.useState(false);

  const visitHomepage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    history.push(`/`);
  };

  const sections = [
    { key: "Homepage", content: "Homepage", href: "/" },
    { key: "Hero details", content: "Hero details", active: true }
  ];
  const deleteHero = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    deleteSingleHero(idParam.slice(1));
    setIsDeleted(true);
  };

  React.useEffect(() => {
    getSingleHero(idParam.slice(1)).then(
      result => setHeroInfo(result),
      () => history.push(`/not/Found`) // I guess this is not exactly how this should be handled but couldn't think of anything else
    );
  }, [idParam, history]);
  React.useEffect(() => {
    heroInfo.id.length !== 0 ? setLoading(false) : setLoading(true);
  }, [heroInfo]);

  return (
    <HeroViewStyled className="heroView">
      <Breadcrumb icon="right angle" sections={sections} />
      <div className="heroView_card">
        {!isDeleted ? (
          <Card fluid>
            <Image
              className="heroView_image"
              centered
              size="medium"
              src={heroInfo.avatar_url}
            />
            <Card.Content>
              <Card.Header textAlign="center">{heroInfo.full_name}</Card.Header>
              <Card.Meta textAlign="center">{heroInfo.type.name}</Card.Meta>
              <Card.Description textAlign="center">
                {heroInfo.description}
              </Card.Description>
            </Card.Content>
            <Card.Content textAlign="center">
              <ButtonComponent
                loading={loading}
                isIcon
                iconName="trash"
                buttonText="Delete hero"
                buttonColor="red"
                isBasic
                onButtonClick={(e, data) => deleteHero(e, data)}
              />
            </Card.Content>
          </Card>
        ) : (
          <Card fluid>
            <Card.Content textAlign="center">Hero is DELETED</Card.Content>
            <Card.Content textAlign="center">
              <ButtonComponent
                loading={loading}
                isIcon
                iconName="home"
                buttonText="Back to Homepage"
                buttonColor="blue"
                isBasic
                onButtonClick={(e, data) => visitHomepage(e, data)}
              />
            </Card.Content>
          </Card>
        )}
      </div>
    </HeroViewStyled>
  );
};

export default HeroView;
