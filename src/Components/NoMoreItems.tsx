import * as React from "react";
import { List } from "semantic-ui-react";
import styled from "styled-components";

export const NoMoreItemsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 1rem;
  font-family: sans-serif;
  margin: 0.5rem 0;
  border-radius: 5px;
  background: #fff;
  & .item-information {
    margin: auto;
    font-style: italic;
  }
`;

export type NoMoreItemsProps = {
  information: string;
};

const NoMoreItems: React.FC<NoMoreItemsProps> = ({ information }) => {
  return (
    <React.Fragment>
      <List.Item>
        <NoMoreItemsStyled>
          <p className="item-information">{information}</p>
        </NoMoreItemsStyled>
      </List.Item>
    </React.Fragment>
  );
};

export default NoMoreItems;
