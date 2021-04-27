import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ItemCard,
  ItemCardImage,
  ItemCardTitle,
  ItemList,
} from "../../components/Item";
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
import { DataList, DataListItem } from "../../components/Admin";

export function AdminPage() {
  const [admin, setAdmin] = useState();
  const { admin: authAdmin } = useContext(AdminContext);
  const { adminId } = useParams();
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdmin(adminId);
  }, [adminId]);

  async function getAdmin(adminId) {
    try {
      let response = await fetch(`/api/admin/${adminId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setAdmin(data);
      setList(data.itemsApproved);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      if (!users.length) {
        let response = await fetch(`/api/admin/users`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        setUsers(data);
      }
      setList(users);
    } catch (error) {
      console.log(error);
    }
  }
  async function getItems() {
    try {
      if (!items.length) {
        let response = await fetch(`/api/admin/items`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await response.json();
        setItems(data);
      }
      setList(items);
    } catch (error) {
      console.log(error);
    }
  }

  return admin ? (
    <PageContainer>
      <UserHeadSection>
        <img src="/user.png" alt="user" />
        <UserHeadInfo>
          <Title>{`${admin.firstName} ${admin.lastName}`}</Title>
          {authAdmin?._id === admin._id && (
            <>
              <Title2>{authAdmin.email}</Title2>
              <UserHeadButtons>
                <ButtonLink to={`/admin`}>Add an Admin</ButtonLink>
                <ButtonLink to={`/admin/${authAdmin._id}/edit`}>
                  Edit Profile
                </ButtonLink>
              </UserHeadButtons>
            </>
          )}
        </UserHeadInfo>
      </UserHeadSection>
      <UserItemsSection>
        <UserItemsNav>
          <ButtonOption onClick={(e) => setList(admin.itemsApproved)}>
            Approved Items
          </ButtonOption>
          <ButtonOption onClick={(e) => setList(admin.usersApproved)}>
            Approved Users
          </ButtonOption>
          <ButtonOption onClick={(e) => getItems()}>All Items</ButtonOption>
          <ButtonOption onClick={(e) => getUsers()}>All Users</ButtonOption>
        </UserItemsNav>
        <DataList>
          {list.length ? (
            list.map((item) => (
              <DataListItem key={item._id}>{item._id}</DataListItem>
            ))
          ) : (
            <NoResults>No items to show</NoResults>
          )}
        </DataList>
      </UserItemsSection>
    </PageContainer>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
