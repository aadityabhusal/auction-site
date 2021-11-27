import { DataListHead, DataListItem, DataListRow } from "./Admin";
import { Input } from "./Core";

let itemListHead = [
  ["Title", 0],
  // ["Image", 1],
  ["Category", 1],
  ["Bid Amount", 0],
  ["Seller", 0],
  ["Contact", 0],
  ["Address", 0],
  ["Auction Date", 0],
  ["Status", 1],
];

const categories = [
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function AdminItemList({ data }) {
  return (
    <>
      <DataListRow>
        {itemListHead.map((item) => (
          <DataListHead key={item[0]} short={item[1]}>
            {item[0]}
          </DataListHead>
        ))}
      </DataListRow>
      {data.map((item) => (
        <DataListRow key={item._id}>
          <DataListItem title={item.title}>
            <a href={`/item/${item._id}`} rel="noreferrer" target="_blank">
              {item.title}
            </a>
          </DataListItem>
          {/* <DataListItem short>
            <a
              href={`http://localhost:8000/uploads/${item.image}`}
              rel="noreferrer"
              target="_blank"
            >
              View
            </a>
          </DataListItem> */}
          <DataListItem title={categories[item.category - 1]} short>
            <a
              href={`http://localhost:8000/uploads/${item.image}`}
              rel="noreferrer"
              target="_blank"
            >
              {categories[item.category - 1]}
            </a>
          </DataListItem>
          <DataListItem title={item.bidAmount}>{item.bidAmount}</DataListItem>
          <DataListItem
            title={item.seller.firstName + " " + item.seller.lastName}
          >
            <a
              href={`/user/${item.seller._id}`}
              rel="noreferrer"
              target="_blank"
            >
              {item.seller.firstName + " " + item.seller.lastName}
            </a>
          </DataListItem>
          <DataListItem title={item.contact}>{item.contact}</DataListItem>
          <DataListItem title={item.address}>{item.address}</DataListItem>
          <DataListItem title={formatDate(item.auctionDate)}>
            {formatDate(item.auctionDate)}
          </DataListItem>
          <DataListItem title={item.status ? "Approved" : "Not Approved"} short>
            <Input
              type="checkbox"
              defaultChecked={item.status}
              onChange={(e) => handleApproval(e, item, "item")}
            />
          </DataListItem>
        </DataListRow>
      ))}
    </>
  );
}

async function handleApproval(e, data, type) {
  let value = e.target.checked ? 1 : 0;
  try {
    await fetch(`/api/${type}/${data._id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    });
  } catch (error) {}
}

function formatDate(dateString) {
  let date = new Date(dateString);
  return date.toUTCString();
}
