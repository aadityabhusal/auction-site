import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AdminContext } from "../../contexts/AdminContext";

export const AdminRoutes = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AdminContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
