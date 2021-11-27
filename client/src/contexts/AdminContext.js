import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`/api/admin/auth`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            adminToken: token,
          }),
        });
        let admin = await response.json();
        if (!admin.error) {
          setAdmin(admin);
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
    <AdminContext.Provider
      value={{ admin, setAdmin, setToken, isAuthenticated }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
