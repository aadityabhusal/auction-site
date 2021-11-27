import React, { useState } from "react";
import { NoResults, PageContainer, Title2 } from "../../components/Core";
import {
  ItemCard,
  ItemCardImage,
  ItemCardTitle,
  ItemList,
} from "../../components/Item";

export function HomePage() {
  let [items, setItems] = useState([]);

  useState(() => {
    getHomePageItems();
  }, []);

  async function getHomePageItems() {
    try {
      let response = await fetch(`/api/item/homepage`);
      let data = await response.json();
      setItems(data);
    } catch (error) {}
  }

  return (
    <PageContainer>
      <Title2>Today's Auctions</Title2>
      <ItemList>
        {items.length ? (
          items.map((item) => (
            <ItemCard key={item._id}>
              <ItemCardImage>
                <img src={`/uploads/${item.image}`} alt={item.title} />
              </ItemCardImage>
              <ItemCardTitle to={`/item/${item._id}`}>
                {item.title}
              </ItemCardTitle>
            </ItemCard>
          ))
        ) : (
          <NoResults>No items to show</NoResults>
        )}
      </ItemList>
    </PageContainer>
  );
}
