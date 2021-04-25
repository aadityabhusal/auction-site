import React from "react";
import { useParams, Redirect } from "react-router";
import { useAuth } from "../Auth/useAuth";

export function AdminPage() {
  const { adminId } = useParams();
  let { auth, loggedIn } = useAuth();
  console.log(auth, adminId);
  return loggedIn && auth._id === adminId ? (
    <div>AdminPage</div>
  ) : (
    <Redirect to="/" />
  );
}
