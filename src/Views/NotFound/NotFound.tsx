import * as React from "react";
import { useHistory } from "react-router-dom";
import { ButtonProps, Header } from "semantic-ui-react";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent";

export const NotFoundStyled = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .header.notFound_header {
    font-size: 100px;
    font-weight: bold;
  }
  & .notFound_desc {
    font-size: 30px;
    font-weight: bold;
  }
`;

const NotFound: React.FC = () => {
  const history = useHistory();
  const visitHomepage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    history.push(`/`);
  };
  return (
    <NotFoundStyled className="notFound">
      <Header as="h1" color="blue" className="notFound_header">
        OOPS!
      </Header>
      <p className="notFound_desc">
        We can't find the page you're looking for.
      </p>
      <ButtonComponent
        buttonText="Visit homepage"
        buttonColor="blue"
        isBasic
        onButtonClick={(e, data) => visitHomepage(e, data)}
      />
    </NotFoundStyled>
  );
};

export default NotFound;
