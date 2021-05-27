import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import {
  Button,
  Input,
  Title,
  FormBox,
  Form,
  Message,
} from "../../components/Core";
import { AdminContext } from "../../contexts/AdminContext";

export function AdminLoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { admin, setToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    try {
      let response = await (
        await fetch(`/api/admin/login`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        })
      ).json();

      if (!response.error) {
        localStorage.setItem("adminToken", response.adminToken);
        setToken(response.adminToken);
        props.history.push(`/admin/` + response.uid);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !admin ? (
    <FormBox>
      {error && <Message color="#c0392b">{error}</Message>}
      <Title center>Admin Login</Title>
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
        <Button>Admin Login</Button>
      </Form>
    </FormBox>
  ) : (
    <Redirect to={`/admin/${admin._id}`} />
  );
}
