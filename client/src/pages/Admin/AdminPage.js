import React, { useContext, useEffect, useState } from "react";

import {
  ButtonLink,
  ButtonOption,
  NoResults,
  PageContainer,
  Title,
  Title2,
} from "../../components/Core";

import {
  UserHeadSection,
  UserHeadInfo,
  UserHeadButtons,
  UserItemsSection,
  UserItemsNav,
} from "../../components/User";

import { AdminContext } from "../../contexts/AdminContext";
import { DataList } from "../../components/Admin";
import { AdminUserList } from "../../components/AdminUserList";
import { AdminItemList } from "../../components/AdminItemList";
import { AdminBidderList } from "../../components/AdminBiddersList";

export function AdminPage() {
  const { admin } = useContext(AdminContext);
  const [listType, setListType] = useState("");
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  // const [winners, setWinners] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getUsers() {
    try {
      if (users.length < 1) {
        let response = await fetch(`/api/admin/users`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        setUsers(data);
        setListType("user");
        setList(data);
      } else {
        setListType("user");
        setList(users);
      }
    } catch (error) {}
  }

  async function getItems() {
    try {
      if (items.length < 1) {
        let response = await fetch(`/api/admin/items`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        setItems(data);
        setList(data);
        setListType("item");
      } else {
        setList(items);
        setListType("item");
      }
    } catch (error) {}
  }

  async function getAdmins() {
    try {
      if (admins.length < 1) {
        let response = await fetch(`/api/admin/admins`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        setAdmins(data);
        setListType("admin");
        setList(data);
      } else {
        setListType("admin");
        setList(admins);
      }
    } catch (error) {}
  }

  async function getAuctionWinners() {
    setList(items);
    setListType("winners");
  }

  return admin ? (
    <PageContainer>
      <UserHeadSection>
        <img src="/user.png" alt="user" />
        <UserHeadInfo>
          <Title>{`${admin.firstName} ${admin.lastName}`}</Title>
          {admin?._id === admin._id && (
            <>
              <Title2>{admin.email}</Title2>
              <UserHeadButtons>
                {admin.role === 1 && (
                  <ButtonLink to={`/admin/signup`}>Add an Admin</ButtonLink>
                )}
                <ButtonLink to={`/admin/${admin._id}/edit`}>
                  Edit Profile
                </ButtonLink>
              </UserHeadButtons>
            </>
          )}
        </UserHeadInfo>
      </UserHeadSection>
      <UserItemsSection>
        <UserItemsNav>
          {/* <ButtonOption onClick={(e) => setList(admin.itemsApproved)}>
            Approved Items
          </ButtonOption>
          <ButtonOption onClick={(e) => setList(admin.usersApproved)}>
            Approved Users
          </ButtonOption> */}
          <ButtonOption onClick={(e) => getItems()}>All Items</ButtonOption>
          <ButtonOption onClick={(e) => getUsers()}>All Users</ButtonOption>
          <ButtonOption onClick={(e) => getAuctionWinners()}>
            Auction Winners
          </ButtonOption>
          {admin.role === 1 && (
            <ButtonOption onClick={(e) => getAdmins()}>All Admins</ButtonOption>
          )}
        </UserItemsNav>
        <DataList>
          {list.length ? (
            listType === "user" ? (
              <AdminUserList data={list} type="user" />
            ) : listType === "admin" ? (
              <AdminUserList data={list} type="admin" />
            ) : listType === "item" ? (
              <AdminItemList data={list} />
            ) : listType === "winners" ? (
              <AdminBidderList data={list} />
            ) : null
          ) : (
            <NoResults>Select from Items, Users or Admins</NoResults>
          )}
        </DataList>
      </UserItemsSection>
    </PageContainer>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
