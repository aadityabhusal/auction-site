import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import { Header } from "./Header";
import { HomePage } from "../Home/HomePage";
import { LoginPage } from "../User/LoginPage";
import { SignupPage } from "../User/SignupPage";
import { UserPage } from "../User/UserPage";
import { EditUserPage } from "../User/EditUserPage";
import { ItemPage } from "../Item/ItemPage";
import { CreateItemPage } from "../Item/CreateItemPage";
import { EditItemPage } from "../Item/EditItemPage";
import { SearchItemPage } from "../Item/SearchItemPage";
import { ErrorPage } from "./ErrorPage";
import { GlobalContainer } from "../../components/Core";
import { AdminPage } from "../Admin/AdminPage";
import { EditAdminPage } from "../Admin/EditAdminPage";

import { UserProvider } from "../../contexts/UserContext";
import { Protected } from "../Auth/Protected";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <GlobalContainer>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/search" component={SearchItemPage} />
            <Protected exact path="/item" component={CreateItemPage} />
            <Route exact path="/item/:itemId" component={ItemPage} />
            <Protected
              exact
              path="/item/:itemId/edit"
              component={EditItemPage}
            />
            <Route exact path="/user/:userId" component={UserPage} />
            <Protected path="/user/:userId/edit" component={EditUserPage} />
            <Protected exact path="/admin/:adminId" component={AdminPage} />
            <Protected
              exact
              path="/admin/:adminId/edit"
              component={EditAdminPage}
            />
            <Route component={ErrorPage} />
          </Switch>
        </GlobalContainer>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
