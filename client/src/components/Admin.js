import styled from "styled-components";

export const DataList = styled.div`
  flex: 1;
  margin-top: 30px;

  & a {
    color: #3f51b5;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const DataListRow = styled.div`
  border-bottom: 1px solid #444;
  display: flex;
`;

export const DataListItem = styled.div`
  padding: 5px;
  flex: ${(props) => (props.short ? "1" : 2)} 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DataListHead = styled(DataListItem)`
  font-weight: bold;
`;
