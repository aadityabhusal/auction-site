import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Button, Input, Title, FormBox, Form } from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

export function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    try {
      let response = await (
        await fetch(`/user/login`, {
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
        localStorage.setItem("auctionSiteToken", response.auctionSiteToken);
        setToken(response.auctionSiteToken);
        props.history.push(`/user/` + response.uid);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !user ? (
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
  ) : (
    <Redirect to={`/user/${user._id}`} />
  );
}
