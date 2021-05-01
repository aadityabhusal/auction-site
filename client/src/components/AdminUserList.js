import { DataListHead, DataListItem, DataListRow } from "./Admin";
import { Input } from "./Core";

let userListHead = [
  ["First Name", 0],
  ["Last Name", 0],
  ["Email", 0],
  ["Contact", 0],
  ["Address", 0],
  ["Status", 1],
];

export function AdminUserList({ data, type }) {
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
          <DataListItem title={item.firstName + " " + item.lastName}>
            <a href={`/user/${item._id}`} rel="noreferrer" target="_blank">
              {item.firstName + " " + item.lastName}
            </a>
          </DataListItem>
          <DataListItem title={item.email}>{item.email}</DataListItem>
          <DataListItem title={item.contact}>{item.contact}</DataListItem>
          <DataListItem title={item.address}>{item.address}</DataListItem>
          <DataListItem title={item.status ? "Approved" : "Not Approved"} short>
            <Input
              type="checkbox"
              defaultChecked={item.status}
              onChange={(e) => handleApproval(e, item, type)}
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
  } catch (error) {
    console.log(error.message);
  }
}
