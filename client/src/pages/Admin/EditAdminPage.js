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
} from "../../components/Core";
import { AdminContext } from "../../contexts/AdminContext";

export function EditAdminPage({ history }) {
  const [admin, setAdmin] = useState();
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

  return admin ? (
    <FormBox>
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
    </FormBox>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
