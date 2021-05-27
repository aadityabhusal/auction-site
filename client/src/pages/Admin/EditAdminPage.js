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
import { AdminContext } from "../../contexts/AdminContext";

export function EditAdminPage({ history }) {
  const [admin, setAdmin] = useState();
  const [dialogBox, setDialogBox] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { admin: authAdmin, setAdmin: setAuthAdmin } = useContext(AdminContext);
  const { adminId } = useParams();

  useEffect(() => {
    setAdmin(authAdmin);
  }, [authAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await (
        await fetch(`/api/admin/${adminId}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        })
      ).json();
      if (!response.error) {
        setAuthAdmin(response);
        setUpdated(true);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInput = (e, field) => {
    setAdmin((prev) => ({ ...prev, [field]: e.target.value }));
  };

  async function deleteAdmin(e) {
    try {
      let response = await (
        await fetch(`/api/admin/${adminId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (!response.error) {
        localStorage.removeItem("adminToken");
        window.location = "/";
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return admin ? (
    <FormBox>
      {dialogBox && (
        <DialogOverlay>
          <DialogBox>
            <DialogHead>
              <svg height="16px" viewBox="0 0 20 20" width="24px" fill="#000">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              Delete Profile
            </DialogHead>
            <DialogText>
              Are you sure you want to delete your profile?
            </DialogText>
            <DialogAction>
              <Button color="#c0392b" onClick={deleteAdmin}>
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
          value={admin.firstName}
          onChange={(e) => handleInput(e, "firstName")}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Last Name"
          value={admin.lastName}
          onChange={(e) => handleInput(e, "lastName")}
          required
        ></Input>
        <Input
          type="email"
          placeholder="Enter your email"
          value={admin.email}
          onChange={(e) => handleInput(e, "email")}
          required
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={admin.contact}
          onChange={(e) => handleInput(e, "contact")}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Address"
          value={admin.address}
          onChange={(e) => handleInput(e, "address")}
          required
        ></Input>
        <Button>Update Profile</Button>
      </Form>

      {admin.role !== 1 && (
        <Button color="#c0392b" onClick={(e) => setDialogBox(true)}>
          Delete Profile
        </Button>
      )}
    </FormBox>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
