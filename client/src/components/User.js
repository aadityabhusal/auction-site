import styled from "styled-components";

export const UserHeadSection = styled.div`
  flex: 1;
  padding: 20px;
  border-bottom: 2px solid #34495e;
  display: flex;
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
  display: flex;
  justify-content: flex-end;
`;
