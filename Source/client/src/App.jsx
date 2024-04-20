import { createHashRouter, RouterProvider } from "react-router-dom";

import Branches from "./components/branches";
import Cart from "./components/cart";
import Dashboard from "./components/dashboard";
import DashboardAssociate from "./components/dashboardAssociate";
import DashboardCustomer from "./components/dashboardCustomer";
import DashboardDriver from "./components/dashboardDriver";
import DashboardManager from "./components/dashboardManager";
import DashboardManagerEmployees from "./components/dashboardManagerEmployees";
import DashboardManagerInventory from "./components/dashboardManagerInventory";
import DashboardManagerReports from "./components/dashboardManagerReports";
import Package from "./components/package";
import Products from "./components/products";
import Profile from "./components/profile";

import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./contexts/ProtectedRoute";
import RedirectIfLoggedIn from "./contexts/RedirectIfLoggedIn";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

import "./components/shared/_reset.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <RedirectIfLoggedIn children={<Login />} />,
  },
  {
    path: "/register",
    element: <RedirectIfLoggedIn children={<Register />} />,
  },
  {
    path: "/branches",
    element: <Branches />,
  },
  {
    path: "/cart",
    element: <ProtectedRoute children={<Cart />} />,
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
    element: <ProtectedRoute children={<DashboardManagerEmployees />} />,
  },
  {
    path: "/dashboard/manager/inventory/:branchId",
    element: <ProtectedRoute children={<DashboardManagerInventory />} />,
  },
  {
    path: "/dashboard/manager/reports",
    element: <ProtectedRoute children={<DashboardManagerReports />} />,
  },
  {
    path: "/package/:packageId",
    element: <ProtectedRoute children={<Package />} />,
  },
  {
    path: "/products",
    element: <ProtectedRoute children={<Products />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute children={<Profile />} />,
  },
]);

// Authentication router potential improvement:
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

export default function App() {
  return <AuthProvider children={<RouterProvider router={router} />} />;
}