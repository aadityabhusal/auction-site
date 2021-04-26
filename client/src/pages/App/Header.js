import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

export function Header() {
  const { user, setUser, setToken } = useContext(UserContext);

  const logout = async (e) => {
    localStorage.removeItem("auctionSiteToken");
    setToken("");
    setUser(null);
  };

  return (
    <HeaderContainer>
      <div>
        <img src="/logo.jpg" alt="Logo" style={{ height: "50px" }} />
      </div>
      <nav>
        <NavLink activeClassName="is-active" to="/" exact={true}>
          Home
        </NavLink>
        <NavLink activeClassName="is-active" to="/search">
          Search
        </NavLink>
        {user ? (
          <>
            <NavLink activeClassName="is-active" to={`/user/${user._id}`}>
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
