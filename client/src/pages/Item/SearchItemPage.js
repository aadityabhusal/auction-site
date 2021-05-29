import React, { useState } from "react";
import {
  ItemList,
  ItemCard,
  ItemCardImage,
  ItemCardTitle,
} from "../../components/Item";
import {
  Input,
  NoResults,
  PageContainer,
  Select,
  Button,
} from "../../components/Core";
import {
  SearchPageContainer,
  SearchBox,
  SearchPanel,
  SearchContainer,
  SearchPanelTitle,
  SearchPanelItem,
  SearchPanelItemTitle,
  SearchPanelInput,
} from "../../components/SearchPage";

const categories = [
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function SearchItemPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(["", ""]);
  const [auctionDate, setAuctionDate] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      try {
        let response = await fetch(`/api/item/search/${search}`);
        let data = await response.json();
        setResults(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleAdvancedSearch = async (e) => {
    if (!search) {
      return;
    }
    const data = {
      search,
    };
    if (category) {
      data["category"] = category;
    }
    if (price[0] && price[1]) {
      data["price"] = price;
    }
    if (auctionDate) {
      data["auctionDate"] = auctionDate;
    }
    try {
      let response = await (
        await fetch(`/api/item/advanced`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();
      console.log(response);
      setResults(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePrice = (e, val) => {
    if (val === "min") {
      if (Number(e.target.value) >= Number(price[1])) {
        setPrice((prev, prop) => [prev[0], Number(prev[0]) + 1]);
      }
    }
    if (val === "max") {
      if (Number(e.target.value) <= Number(price[0])) {
        setPrice((prev, prop) => [Number(prev[1]) - 1, prev[1]]);
      }
    }
  };

  return (
    <PageContainer>
      <SearchPageContainer>
        <SearchPanel>
          <SearchPanelTitle>Search Options</SearchPanelTitle>
          <SearchPanelItem>
            <SearchPanelItemTitle>Category</SearchPanelItemTitle>
            <Select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((item, i) => (
                <option key={i} value={i + 1}>
                  {item}
                </option>
              ))}
            </Select>
          </SearchPanelItem>
          <SearchPanelItem>
            <SearchPanelItemTitle>Price</SearchPanelItemTitle>
            <SearchPanelInput
              type="number"
              placeholder="Min. Value"
              value={price[0]}
              onChange={(e) => setPrice((prev) => [e.target.value, prev[1]])}
              onBlur={(e) => handlePrice(e, "min")}
            />
            <SearchPanelInput
              type="bumber"
              placeholder="Max. Value"
              value={price[1]}
              onChange={(e) => setPrice((prev) => [prev[0], e.target.value])}
              onBlur={(e) => handlePrice(e, "max")}
            />
          </SearchPanelItem>
          <SearchPanelItem>
            <SearchPanelItemTitle>Auction Date</SearchPanelItemTitle>
            <SearchPanelInput
              type="date"
              value={auctionDate}
              onChange={(e) => setAuctionDate(e.target.value)}
            />
          </SearchPanelItem>
          <Button onClick={handleAdvancedSearch}>Advanced Search</Button>
        </SearchPanel>
        <SearchContainer>
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
        </SearchContainer>
      </SearchPageContainer>
    </PageContainer>
  );
}
