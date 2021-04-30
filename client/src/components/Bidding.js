import styled from "styled-components";

export const BiddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 30px;
  border-top: 3px solid #3f51b5;
  padding: 20px;
`;

export const BiddingSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-bottom: 2px solid #3f51b5;
  padding: 20px;

  & input {
    flex: 1;
    margin-right: 30px;
    margin-bottom: 0;
  }

  & button {
    font-size: 16px;
  }
`;

export const BidderForm = styled.form`
  margin: 0;
  flex: 1;
  display: flex;
`;

export const BidAmount = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;

  & p {
    margin: 0px;
    padding-top: 4px;
    margin-right: 15px;
    font-size: 14px;
    font-weight: bold;
  }

  & h2 {
    margin: 0;
    font-size: 30px;
    color: #3f51b5;
  }
`;

export const BiddersSection = styled.div`
  padding: 20px;
`;

export const BidderContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #3f51b5;
`;

export const BidderImage = styled.div`
  flex: 0 0 60px;
  margin-right: 20px;
  & img {
    width: 100%;
  }
`;

export const BidderInfo = styled.div`
  flex: 1;
  & h2,
  h3 {
    margin: 0;
    margin-bottom: 5px;
  }
`;
