import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  Select,
} from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

export function SignupPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState();
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      password,
      contact,
      address,
      role,
    };
    try {
      let user = await fetch(`/api/user/signup`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!user.error) {
        props.history.push("/login");
      } else {
        throw new Error(user.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !user ? (
    <FormBox>
      <Title center>Create your account</Title>
      <Form onSubmit={handleSubmit} method="POST">
        <Input
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></Input>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></Input>
        <Input
          type="text"
          placeholder="Enter your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
        <Select onChange={(e) => setRole(e.target.value)}>
          <option value="">Select your account type</option>
          <option value="2">Seller</option>
          <option value="3">Bidder</option>
        </Select>
        <Button>Signup</Button>
      </Form>
    </FormBox>
  ) : (
    <Redirect to={`/user/${user._id}`} />
  );
}
