import React, { useState } from "react";
import { SearchBox } from "../../components/Auction";
import { Input } from "../../components/Core";

export function SearchAuctionPage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      console.log(search);
    }
  };

  return (
    <SearchBox>
      <Input
        type="text"
        placeholder="Type auction name and press enter"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleSearch}
      />
    </SearchBox>
  );
}
