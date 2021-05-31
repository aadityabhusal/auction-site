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
import { UserContext } from "../../contexts/UserContext";

export function UserPage() {
  const [user, setUser] = useState();
  const { user: authUser } = useContext(UserContext);
  const { userId } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [wonItems, setWonItems] = useState([]);

  useEffect(() => {
    getUser(userId);
    getWonItems();
  }, [userId, authUser]);

  const getUser = async (userId) => {
    try {
      let response = await fetch(`/api/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setUser(data);
      if (authUser?._id === data._id) {
        setItems(data.items);
        setSelectedItems(data.items);
      } else {
        let list = data.items.filter((item) => item.status === 1);
        setItems(list);
        setSelectedItems(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getWonItems() {
    try {
      let response = await fetch(`/api/user/${userId}/wonitems`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setWonItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  return user ? (
    <PageContainer>
      <UserHeadSection>
        <img src="/user.png" alt="user" />
        <UserHeadInfo>
          <Title>{`${user.firstName} ${user.lastName}`}</Title>
          {authUser?._id === user._id && (
            <>
              <Title2>{authUser.email}</Title2>
              <UserHeadButtons>
                <ButtonLink to={`/item`}>Sell an Item</ButtonLink>
                <ButtonLink to={`/user/${authUser._id}/edit`}>
                  Edit Profile
                </ButtonLink>
              </UserHeadButtons>
            </>
          )}
        </UserHeadInfo>
      </UserHeadSection>
      <UserItemsSection>
        <UserItemsNav>
          <ButtonOption onClick={(e) => setSelectedItems(items)}>
            Selling Items
          </ButtonOption>
          <ButtonOption onClick={(e) => setSelectedItems(wonItems)}>
            Won Items
          </ButtonOption>
        </UserItemsNav>
        <ItemList>
          {selectedItems.length ? (
            selectedItems.map((item) => (
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
      </UserItemsSection>
    </PageContainer>
  ) : (
    <NoResults>No such user found</NoResults>
  );
}
