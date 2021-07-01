import * as React from "react";
import { Header, Image, List } from "semantic-ui-react";
import styled from "styled-components";

export const ItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 1rem;
  font-family: sans-serif;
  margin: 0.5rem 0;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  & .item-fullName {
    width: 200px;
  }
  & .item-typeName {
    width: 100px;
  }
  & .item-description {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
    height: 1.2em;
    white-space: nowrap;
  }
`;

export type ListItemProps = {
  avatarUrl: string;
  description: string;
  fullName: string;
  id: string;
  type: HeroType;
  showHero: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const ListItem: React.FC<ListItemProps> = ({
  avatarUrl,
  description,
  fullName,
  id,
  type,
  showHero
}) => {
  return (
    <React.Fragment>
      <List.Item onClick={showHero} value={id}>
        <ItemStyled>
          <Image className="item-avatar" src={avatarUrl} size="mini" circular />
          <Header className="item-fullName" as="h3">
            {fullName}
          </Header>
          <p className="item-typeName">{type.name}</p>
          <p className="item-description">{description}</p>
        </ItemStyled>
      </List.Item>
    </React.Fragment>
  );
};

export default ListItem;
