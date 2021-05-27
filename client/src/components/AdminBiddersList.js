import { DataListHead, DataListItem, DataListRow } from "./Admin";
import { Input } from "./Core";

let userListHead = [
  ["Bidder Name", 0],
  ["Item", 0],
  ["Bid Amount", 0],
  ["Approved", 1],
];

export function AdminBidderList({ data }) {
  const bidders = data
    .filter((item) => (item.bidders.length ? true : false))
    .map((item) => {
      return [
        {
          _id: item._id,
          title: item.title,
          image: item.image,
          winner: item.winner?._id ? 1 : 0,
        },
        item.bidders.sort(
          (a, b) => Number(b.bidAmount) - Number(a.bidAmount)
        )[0],
      ];
    });

  return (
    <>
      <DataListRow>
        {userListHead.map((item) => (
          <DataListHead key={item[0]} short={item[1]}>
            {item[0]}
          </DataListHead>
        ))}
      </DataListRow>
      {bidders.map((item) => (
        <DataListRow key={item[0]._id}>
          <DataListItem title={`${item[1].firstName} ${item[1].lastName}`}>
            <a href={`/user/${item[1]._id}`} rel="noreferrer" target="_blank">
              {`${item[1].firstName} ${item[1].lastName}`}
            </a>
          </DataListItem>
          <DataListItem title={item[0].title}>
            <a href={`/item/${item[0]._id}`} rel="noreferrer" target="_blank">
              {item[0].title}
            </a>
          </DataListItem>
          <DataListItem title={item[1].bidAmount}>
            {item[1].bidAmount}
          </DataListItem>
          <DataListItem title={item.winner ? "Approved" : "Not Approved"} short>
            <Input
              type="checkbox"
              defaultChecked={item[0].winner}
              onChange={(e) => handleApproval(e, item)}
            />
          </DataListItem>
        </DataListRow>
      ))}
    </>
  );
}

async function handleApproval(e, item) {
  let { winner, ...itemData } = item[0];
  itemData.winner = item[1]._id;
  let value = 0;
  let winnerData = {};
  if (e.target.checked) {
    value = 1;
    winnerData = item[1];
    delete itemData.winner;
  }
  let data = {
    winner: winnerData,
    item: itemData,
    approved: value,
  };
  console.log(data);
  try {
    await fetch(`/api/admin/approveWinner`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error.message);
  }
}
