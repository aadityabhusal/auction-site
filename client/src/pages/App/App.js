import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import { Header } from "./Header";
import { HomePage } from "../Home/HomePage";
import { LoginPage } from "../Auth/LoginPage";
import { SignupPage } from "../Auth/SignupPage";
import { SellerPage } from "../User/SellerPage";
import { EditSellerPage } from "../User/EditSellerPage";
import { BidderPage } from "../User/BidderPage";
import { EditBidderPage } from "../User/EditBidderPage";
import { AuctionPage } from "../Auction/AuctionPage";
import { CreateAuctionPage } from "../Auction/CreateAuctionPage";
import { EditAuctionPage } from "../Auction/EditAuctionPage";
import { SearchAuctionPage } from "../Auction/SearchAuction";
import { ErrorPage } from "./ErrorPage";
import { Container } from "../../components/Core";
import { AdminPage } from "../User/AdminPage";
import { EditAdminPage } from "../User/EditAdminPage";

import { UserProvider } from "../../contexts/UserContext";

// const roles = ["superadmin", "admin", "seller", "bidder"];

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/search" component={SearchAuctionPage} />
            <Route exact path="/auction" component={CreateAuctionPage} />
            <Route exact path="/auction/:auctionId" component={AuctionPage} />
            <Route
              exact
              path="/auction/:auctionId/edit"
              component={EditAuctionPage}
            />
            <Route exact path="/seller/:sellerId" component={SellerPage} />
            <Route
              exact
              path="/seller/:sellerId/edit"
              component={EditSellerPage}
            />
            <Route exact path="/bidder/:bidderId" component={BidderPage} />
            <Route
              exact
              path="/bidder/:bidderId/edit"
              component={EditBidderPage}
            />
            <Route exact path="/admin/:adminId" component={AdminPage} />
            <Route
              exact
              path="/admin/:adminId/edit"
              component={EditAdminPage}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
