import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const visitDashboard = (user) => {
    switch (user.role) {
      case "Associate":
        return <Navigate to="/dashboard/associate" />;
      case "Driver":
        return <Navigate to="/dashboard/driver" />;
      case "Manager":
        return <Navigate to="/dashboard/manager" />;
      default:
        return <Navigate to="/dashboard/customer" />;
    }
  };
  return visitDashboard(user);
}
