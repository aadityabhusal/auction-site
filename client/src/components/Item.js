import { Link } from "react-router-dom";
import styled from "styled-components";

export const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ItemCard = styled.div`
  flex: 0 0 21%;
  margin: 20px 2%;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 #444;
`;

export const ItemCardImage = styled.div`
  & img {
    border-radius: 5px;
    width: 100%;
  }
`;

export const ItemCardTitle = styled(Link)`
  margin: 0;
  display: block;
  padding: 5px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    color: #3f51b5;
  }
`;

export const ItemImages = styled.div`
  flex: 0 0 25%;
  & img {
    width: 100%;
  }
`;

export const ItemInfo = styled.div`
  margin-left: 20px;
`;

export const ItemInfoItem = styled.div`
  margin-bottom: 10px;
`;

export const SearchBox = styled.div`
  display: flex;
  flex: 1;
`;
