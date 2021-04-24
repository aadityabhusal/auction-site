import React from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import "./App.css";

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
import { Container, Header } from "../../components/Core";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header>
          <div>
            <NavLink to="/">AuctionSite</NavLink>
          </div>
          <nav>
            <NavLink activeClassName="is-active" to="/search">
              Search
            </NavLink>
            <NavLink activeClassName="is-active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="is-active" to="/signup">
              Signup
            </NavLink>
          </nav>
        </Header>
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
          <Route component={ErrorPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
