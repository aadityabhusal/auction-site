import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export const Protected = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
