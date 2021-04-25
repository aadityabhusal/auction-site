import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";
const roles = ["superadmin", "admin", "seller", "bidder"];

export function Header() {
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  const logout = async (e) => {
    await fetch(`/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <HeaderContainer>
      <div>
        <NavLink to="/">Auction Site</NavLink>
      </div>
      <nav>
        <NavLink activeClassName="is-active" to="/search">
          Search
        </NavLink>
        {user ? (
          <>
            <NavLink
              activeClassName="is-active"
              to={`/${roles[user.role]}/${user._id}`}
            >
              {`${user.firstName} ${user.lastName}`}
            </NavLink>
            <NavLink activeClassName="is-active" to="/login" onClick={logout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink activeClassName="is-active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="is-active" to="/signup">
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </HeaderContainer>
  );
}
