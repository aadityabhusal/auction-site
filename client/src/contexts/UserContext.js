import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`/user/auth`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let user = await response.json();
        if (!user.error) {
          setUser(user);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [loggedIn]);
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};
