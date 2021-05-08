import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  Message,
  NoResults,
  DialogOverlay,
  DialogBox,
  DialogHead,
  DialogText,
  DialogAction,
} from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

export function EditUserPage({ history }) {
  const [user, setUser] = useState();
  const [dialogBox, setDialogBox] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { user: authUser, setUser: setAuthUser } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId, authUser, history);
  }, [userId, authUser, history]);

  async function getUser(userId, authUser, history) {
    try {
      let response = await fetch(`/api/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      if (authUser._id !== data._id) {
        history.push("/");
      } else {
        setUser(authUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await (
        await fetch(`/api/user/${userId}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
      ).json();
      if (!response.error) {
        setAuthUser(response);
        setUpdated(true);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInput = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  async function deleteUser(e) {
    try {
      let response = await (
        await fetch(`/api/user/${userId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (!response.error) {
        localStorage.removeItem("userToken");
        window.location = "/";
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return user ? (
    <FormBox>
      {dialogBox && (
        <DialogOverlay>
          <DialogBox>
            <DialogHead>Delete Profile</DialogHead>
            <DialogText>
              Are you sure you want to delete your profile?
            </DialogText>
            <DialogAction>
              <Button color="#c0392b" onClick={deleteUser}>
                Delete
              </Button>
              <Button onClick={(e) => setDialogBox(false)}>Cancel</Button>
            </DialogAction>
          </DialogBox>
        </DialogOverlay>
      )}
      {updated && <Message>Your profile was updated!</Message>}
      <Title center>Update your profile</Title>
      <Form onSubmit={handleSubmit} method="POST">
        <Input
          type="text"
          placeholder="Enter your First Name"
          value={user.firstName}
          onChange={(e) => handleInput(e, "firstName")}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Last Name"
          value={user.lastName}
          onChange={(e) => handleInput(e, "lastName")}
          required
        ></Input>
        <Input
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => handleInput(e, "email")}
          required
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={user.contact}
          onChange={(e) => handleInput(e, "contact")}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Address"
          value={user.address}
          onChange={(e) => handleInput(e, "address")}
          required
        ></Input>
        <Button>Update Profile</Button>
      </Form>
      <Button color="#c0392b" onClick={(e) => setDialogBox(true)}>
        Delete Profile
      </Button>
    </FormBox>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
