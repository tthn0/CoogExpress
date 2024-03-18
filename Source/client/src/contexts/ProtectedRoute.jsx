import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// This component is used to protect routes that require authentication.
// If the user is not logged in, they will be redirected to the login page.
export default function ProtectedRoute({ children }) {
  const { user, isUserLoading } = useContext(AuthContext);
  return isUserLoading ? (
    <div>Loading...</div>
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
