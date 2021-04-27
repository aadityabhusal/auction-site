import styled from "styled-components";

export const DataList = styled.div`
  flex: 1;
  margin-top: 30px;
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

let userListHead = [
  ["First Name", 0],
  ["Last Name", 0],
  ["Email", 0],
  ["Contact", 0],
  ["Address", 0],
  ["Status", 1],
];

export function AdminUserList({ data }) {
  return (
    <>
      <DataListRow>
        {userListHead.map((item) => (
          <DataListHead key={item[0]} short={item[1]}>
            {item[0]}
          </DataListHead>
        ))}
      </DataListRow>
      {data.map((item) => (
        <DataListRow key={item._id}>
          <DataListItem title={item.firstName}>{item.firstName}</DataListItem>
          <DataListItem title={item.lastName}>{item.lastName}</DataListItem>
          <DataListItem title={item.email}>{item.email}</DataListItem>
          <DataListItem title={item.contact}>{item.contact}</DataListItem>
          <DataListItem title={item.address}>{item.address}</DataListItem>
          <DataListItem title={item.status} short>
            {item.status}
          </DataListItem>
        </DataListRow>
      ))}
    </>
  );
}

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
          <DataListItem title={item.auctionDate}>
            {item.auctionDate}
          </DataListItem>
          <DataListItem title={item.status} short>
            {item.status}
          </DataListItem>
        </DataListRow>
      ))}
    </>
  );
}
