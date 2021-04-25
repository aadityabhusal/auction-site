import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "../../components/Core";

export function Header() {
  return (
    <HeaderContainer>
      <div>
        <NavLink to="/">Auction Site</NavLink>
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
    </HeaderContainer>
  );
}
