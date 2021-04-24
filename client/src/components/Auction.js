import styled from "styled-components";

export const AuctionList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AuctionCard = styled.div`
  flex: 0 0 21%;
  margin: 20px 2%;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 #444;
`;

export const AuctionCardImage = styled.div`
  margin-bottom: 10px;
  & img {
    width: 100%;
  }
`;

export const AuctionCardTitle = styled.h3`
  margin: 0;

  &:hover {
    color: #3f51b5;
  }
`;

export const AuctionImages = styled.div`
  flex: 0 0 25%;
  & img {
    width: 100%;
  }
`;

export const AuctionInfo = styled.div`
  margin-left: 20px;
`;

export const AuctionInfoItem = styled.div`
  margin-bottom: 10px;
`;
