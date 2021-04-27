import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "../../components/Core";
import { AdminContext } from "../../contexts/AdminContext";
import { UserContext } from "../../contexts/UserContext";

export function Header() {
  const { user, setUser, setToken } = useContext(UserContext);
  const { admin, setAdmin, setToken: setAdminToken } = useContext(AdminContext);

  const logout = async (e) => {
    if (localStorage.getItem("userToken") !== null) {
      localStorage.removeItem("userToken");
      setToken("");
      setUser(null);
    }

    if (localStorage.getItem("adminToken") !== null) {
      localStorage.removeItem("adminToken");
      setAdminToken("");
      setAdmin(null);
    }
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
        ) : admin ? (
          <>
            <NavLink activeClassName="is-active" to={`/admin/${admin._id}`}>
              {`${admin.firstName} ${admin.lastName}`}
            </NavLink>
            <NavLink
              activeClassName="is-active"
              to="/admin/login"
              onClick={logout}
            >
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
