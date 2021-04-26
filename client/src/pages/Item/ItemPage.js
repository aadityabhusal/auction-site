import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ButtonLink, PageContainer, Title } from "../../components/Core";
import {
  ItemContainer,
  ItemImages,
  ItemInfo,
  ItemInfoItem,
  ItemInfoTitle,
  ItemInfoValue,
} from "../../components/Item";
import { UserContext } from "../../contexts/UserContext";

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
  const { user } = useContext(UserContext);
  const { itemId } = useParams();

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  async function getItem(itemId) {
    try {
      let response = await fetch(`/item/${itemId}`, {
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
              <Link
                to={`/user/${item.seller._id}`}
              >{`${item.seller.firstName} ${item.seller.lastName}`}</Link>
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
    </PageContainer>
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
  );
}
