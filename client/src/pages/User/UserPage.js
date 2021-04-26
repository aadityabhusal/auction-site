import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ButtonLink, Title, Title2 } from "../../components/Core";
import {
  UserHeadSection,
  UserHeadInfo,
  UserHeadButtons,
} from "../../components/User";
import { UserContext } from "../../contexts/UserContext";

export function UserPage() {
  const [user, setUser] = useState();
  const { user: authUser } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const getUser = async (userId) => {
    try {
      let response = await fetch(`/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
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
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
  );
}
