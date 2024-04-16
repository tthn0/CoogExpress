import { createHashRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard";
import DashboardAssociate from "./components/dashboardAssociate";
import DashboardCustomer from "./components/dashboardCustomer";
import DashboardDriver from "./components/dashboardDriver";
import DashboardManager from "./components/dashboardManager";
import Employees from "./components/dashboardManager/Employees";
import Reports from "./components/reports";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Package from "./components/package";
import Profile from "./components/profile";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./contexts/ProtectedRoute";
import RedirectIfLoggedIn from "./contexts/RedirectIfLoggedIn";
import "./components/shared/_reset.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute children={<Dashboard />} />,
  },
  {
    path: "/dashboard/associate",
    element: <ProtectedRoute children={<DashboardAssociate />} />,
  },
  {
    path: "/dashboard/customer",
    element: <ProtectedRoute children={<DashboardCustomer />} />,
  },
  {
    path: "/dashboard/driver",
    element: <ProtectedRoute children={<DashboardDriver />} />,
  },
  {
    path: "/dashboard/driver/route/:routeId",
    element: <ProtectedRoute children={<DashboardDriver />} />,
  },
  {
    path: "/dashboard/manager",
    element: <ProtectedRoute children={<DashboardManager />} />,
  },
  {
    path: "/dashboard/manager/employees",
    element: <ProtectedRoute children={<Employees />} />,
  },
  {
    path: "/dashboard/manager/reports",
    element: <ProtectedRoute children={<Reports />} />,
  },
  {
    path: "/package/:packageId",
    element: <ProtectedRoute children={<Package />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute children={<Profile />} />,
  },
  {
    path: "/login",
    element: <RedirectIfLoggedIn children={<Login />} />,
  },
  {
    path: "/register",
    element: <RedirectIfLoggedIn children={<Register />} />,
  },
]);

// Authentication router potential improvement:
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

export default function App() {
  return <AuthProvider children={<RouterProvider router={router} />} />;
}
