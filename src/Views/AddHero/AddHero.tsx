import * as React from "react";
// import ButtonComponent from "../../Components/ButtonComponent";
import { Button, ButtonProps, Header, Image, Modal } from "semantic-ui-react";
// import { Breadcrumb, ButtonProps, Card } from "semantic-ui-react";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent";

export const AddHeroStyled = styled.div``;
export type AddHeroProps = {
  loading: boolean;
  addHero: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
};
const AddHero: React.FC<AddHeroProps> = ({ loading, addHero }) => {
  // const [loading, setLoading] = React.useState(true);
  // const [heroInfo, setHeroInfo] = React.useState<HeroModel>({
  //   avatar_url: "",
  //   description: "",
  //   full_name: "",
  //   id: "",
  //   type: { id: "", name: "" }
  // });
  // const idParam = window.location.pathname;
  // const [isDeleted, setIsDeleted] = React.useState(false);

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
  const [open, setOpen] = React.useState(false);

  // const sections = [
  //   { key: "Homepage", content: "Homepage", href: "/" },
  //   { key: "Hero details", content: "Hero details", active: true }
  // ];

  // React.useEffect(() => {
  //   getSingleHero(idParam.slice(1)).then(result => setHeroInfo(result));
  // }, [idParam]);
  // React.useEffect(() => {
  //   heroInfo.id.length !== 0 ? setLoading(false) : setLoading(true);
  // }, [heroInfo]);

  return (
    <AddHeroStyled className="addHero">
      {/* <Breadcrumb icon="right angle" sections={sections} />
      <div className="addHero_card">
        {!isDeleted ? (
          <Card fluid>
            <Image
              className="addHero_image"
              rounded
              centered
              // size="mini"
              // size="tiny"
              // size="small"
              size="medium"
              // size="large"
              // size="big"
              // size="huge"
              // size="massive"
              src={heroInfo.avatar_url}
              // wrapped
              // ui={false}
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
          </Card>
        )}
      </div> */}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <ButtonComponent
            loading={loading}
            isIcon
            iconName="plus"
            buttonText="Add hero"
            buttonColor="green"
            onButtonClick={addHero}
          />
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            wrapped
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition="right"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </AddHeroStyled>
  );
};

export default AddHero;
