import React, { useState } from "react";
import {
  SearchBox,
  ItemList,
  ItemCard,
  ItemCardImage,
  ItemCardTitle,
} from "../../components/Item";
import { Input, NoResults, PageContainer } from "../../components/Core";

export function SearchItemPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      try {
        let response = await fetch(`/api/item/search/${search}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        console.log(data);
        setResults(data);
      } catch (error) {}
    }
  };

  return (
    <PageContainer>
      <SearchBox>
        <Input
          type="text"
          placeholder="Type item name and press enter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={handleSearch}
        />
      </SearchBox>
      <ItemList>
        {results.length ? (
          results.map((item) => (
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
