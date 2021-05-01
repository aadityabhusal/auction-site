import { Link } from "react-router-dom";
import styled from "styled-components";

export const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ItemCard = styled.div`
  flex: 0 0 200px;
  margin: 20px 15px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 #444;
  /* display: flex;
  flex-direction: column; */
  place-self: flex-start;
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

export const ItemContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const ItemImages = styled.div`
  flex: 0 0 40%;
  & img {
    width: 100%;
  }
`;

export const ItemInfo = styled.div`
  margin-left: 20px;
`;

export const ItemInfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  line-height: 1.5;
`;

export const ItemInfoTitle = styled.div`
  font-weight: bold;
  margin-right: 15px;
`;

export const ItemInfoValue = styled.div``;

export const SearchBox = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 30px;
`;
