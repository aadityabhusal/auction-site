import styled from "styled-components";

export const SearchPageContainer = styled.div`
  display: flex;
  background-color: #ecf0f1;
  padding: 10px;
`;

export const SearchContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
`;

export const SearchBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const SearchPanel = styled.div`
  flex: 0 0 250px;
  padding: 10px;
  background-color: #fff;
  margin-right: 20px;
  display: flex;
  flex-direction: column;

  & > button {
    align-self: center;
    width: 100%;
  }
`;

export const SearchPanelTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #bdc3c7;
`;

export const SearchPanelItem = styled.div`
  padding: 5px 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const SearchPanelItemTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #bdc3c7;
  margin-bottom: 10px;
`;

export const SearchPanelInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #bdc3c7;
`;
