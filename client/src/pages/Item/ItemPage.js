import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  ButtonLink,
  Input,
  Message,
  NoResults,
  PageContainer,
  Title,
} from "../../components/Core";
import {
  ItemContainer,
  ItemImages,
  ItemInfo,
  ItemInfoItem,
  ItemInfoTitle,
  ItemInfoValue,
} from "../../components/Item";

import {
  BiddingContainer,
  BiddingSection,
  BiddersSection,
  BidderContainer,
  BidderImage,
  BidderInfo,
  BidderForm,
  BidAmount,
} from "../../components/Bidding";

import { UserContext } from "../../contexts/UserContext";
import { UserNameLink } from "../../components/User";

const categories = [
  "General",
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function ItemPage() {
  const [item, setItem] = useState();
  const [bidAmountInput, setBidAmountInput] = useState("");
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);
  const { itemId } = useParams();

  useEffect(() => {
    if (!item) {
      getItem(itemId);
    }
  }, [itemId, item]);

  async function getItem(itemId) {
    try {
      let response = await fetch(`/api/item/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toUTCString();
  }

  async function placeBids(e) {
    e.preventDefault();
    let data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      bidAmount: bidAmountInput,
    };
    if (bidAmountInput > item.bidAmount) {
      setBidAmountInput("");
      setError("");
      try {
        let response = await (
          await fetch(`/api/item/${itemId}/placeBid`, {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          })
        ).json();
        if (!response.error) {
          setItem(response);
        } else {
          throw new Error(response.error);
        }
      } catch (error) {}
    } else {
      setError("Bid amount must be greater than current bid");
    }
  }

  // function checkBidder(id) {
  //   return item.bidders.findIndex((item) => item._id === id);
  // }

  return item ? (
    <PageContainer>
      <ItemContainer>
        <ItemImages>
          <img src={`/uploads/${item.image}`} alt={item.title} />
        </ItemImages>
        <ItemInfo>
          <Title>{item.title}</Title>
          <ItemInfoItem>
            <ItemInfoTitle>Seller Name: </ItemInfoTitle>
            <ItemInfoValue>
              <UserNameLink
                to={`/user/${item.seller._id}`}
              >{`${item.seller.firstName} ${item.seller.lastName}`}</UserNameLink>
            </ItemInfoValue>
          </ItemInfoItem>
          <ItemInfoItem>
            <ItemInfoTitle>Address: </ItemInfoTitle>
            <ItemInfoValue>{item.address}</ItemInfoValue>
          </ItemInfoItem>
          <ItemInfoItem>
            <ItemInfoTitle>Category: </ItemInfoTitle>
            <ItemInfoValue>{categories[item.category]}</ItemInfoValue>
          </ItemInfoItem>
          {user && (
            <ItemInfoItem>
              <ItemInfoTitle>Contact: </ItemInfoTitle>
              <ItemInfoValue>{item.contact}</ItemInfoValue>
            </ItemInfoItem>
          )}
          <ItemInfoItem>
            <ItemInfoTitle>Auction Time: </ItemInfoTitle>
            <ItemInfoValue>{formatDate(item.auctionDate)}</ItemInfoValue>
          </ItemInfoItem>
          <ItemInfoItem>
            <ItemInfoTitle>Description: </ItemInfoTitle>
          </ItemInfoItem>
          <ItemInfoItem>{item.description}</ItemInfoItem>
          <ItemInfoItem>
            {user?._id === item.seller._id && (
              <ButtonLink to={`/item/${itemId}/edit`}>
                Edit Item Information
              </ButtonLink>
            )}
          </ItemInfoItem>
        </ItemInfo>
      </ItemContainer>
      <BiddingContainer>
        {error && <Message color="#c0392b">{error}</Message>}
        {!item.winner && (
          <BiddingSection>
            <BidAmount>
              <p>Current Bid:</p>
              <h2>£{item.bidAmount}</h2>
            </BidAmount>
            {user && user?._id !== item.seller._id && !item.winner && (
              <BidderForm onSubmit={placeBids} method="POST">
                <Input
                  type="number"
                  name="bidAmount"
                  value={bidAmountInput}
                  placeholder="Enter your bid amount"
                  onChange={(e) => setBidAmountInput(e.target.value)}
                />
                <Button>Place your Bid</Button>
              </BidderForm>
            )}
          </BiddingSection>
        )}
        <BiddersSection>
          {item.bidders.length ? (
            item.winner ? (
              <BidderContainer key={item.winner._id}>
                <BidderImage>
                  <img src="/user.png" alt="user" />
                </BidderImage>
                <BidderInfo>
                  <h3>
                    <UserNameLink
                      to={`/user/${item.winner._id}`}
                    >{`${item.winner.firstName} ${item.winner.lastName}`}</UserNameLink>
                  </h3>
                  <h2>£{item.winner.bidAmount}</h2>
                </BidderInfo>
                <h3 style={{ color: "#3f51b5" }}>Winner!</h3>
              </BidderContainer>
            ) : (
              item.bidders
                .sort((a, b) => b.bidAmount - a.bidAmount)
                .map((item, i) => (
                  <BidderContainer key={item._id + "-" + i}>
                    <BidderImage>
                      <img src="/user.png" alt="user" />
                    </BidderImage>
                    <BidderInfo>
                      <h3>
                        <UserNameLink
                          to={`/user/${item._id}`}
                        >{`${item.firstName} ${item.lastName}`}</UserNameLink>
                      </h3>
                      <h2>£{item.bidAmount}</h2>
                    </BidderInfo>
                  </BidderContainer>
                ))
            )
          ) : (
            <NoResults>No Bids Placed</NoResults>
          )}
        </BiddersSection>
      </BiddingContainer>
    </PageContainer>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
