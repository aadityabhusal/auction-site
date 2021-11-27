import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`/api/user/auth`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userToken: token,
          }),
        });
        let user = await response.json();
        if (!user.error) {
          setUser(user);
        }
      } catch (error) {}
    })();
  }, [token]);

  function isAuthenticated() {
    if (token) {
      return true;
    }
    return false;
  }

  return (
    <UserContext.Provider value={{ user, setUser, setToken, isAuthenticated }}>
      {props.children}
    </UserContext.Provider>
  );
};
