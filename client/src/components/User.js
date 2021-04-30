import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserHeadSection = styled.div`
  flex: 1;
  padding: 20px;
  border-bottom: 2px solid #34495e;
  display: flex;
  margin-bottom: 20px;
  & img {
    width: 100px;
    height: 100px;
    margin-right: 30px;
    border-radius: 100%;
    border: 4px solid #3f51b5;
  }
`;

export const UserHeadInfo = styled.div`
  flex: 1;
  margin-left: 30px;
  & a {
    align-self: flex-end;
    margin: 0 10px;
  }
`;

export const UserHeadButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const UserItemsSection = styled.div``;

export const UserItemsNav = styled.div`
  display: flex;
  margin-bottom: 20px;

  & a {
    margin-left: 15px;
  }
`;

export const UserNameLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #3f51b5;
`;
