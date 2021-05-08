import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  NoResults,
} from "../../components/Core";
import { AdminContext } from "../../contexts/AdminContext";

export function CreateAdminPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const { admin } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      password,
      contact,
      address,
    };
    try {
      let response = await (
        await fetch(`/api/admin/signup`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();
      if (!response.error) {
        props.history.push(`/admin/${admin._id}`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return admin?.role === 1 ? (
    <FormBox>
      <Title center>Create a new Admin</Title>
      <Form onSubmit={handleSubmit} method="POST">
        <Input
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        ></Input>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></Input>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></Input>
        <Button>Create Admin</Button>
      </Form>
    </FormBox>
  ) : (
    <NoResults>You cannot create a new admin</NoResults>
  );
}
