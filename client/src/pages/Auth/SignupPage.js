import React, { useState } from "react";
import { Button, Form, Input, Title } from "../../components/Core";
import { LoginBox, LoginContainer } from "../../components/User";

export function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

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
    console.log(data);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title center>Signup</Title>
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
          <Button>Signup</Button>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
}
