import React, { useState } from "react";
import { Button, Input, Title, FormBox, Form } from "../../components/Core";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    console.log(data);
  };

  return (
    <FormBox>
      <Title center>Login</Title>
      <Form onSubmit={handleSubmit} method="POST">
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
        <Button>Login</Button>
      </Form>
    </FormBox>
  );
}
