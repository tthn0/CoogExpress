import { createHashRouter, RouterProvider } from "react-router-dom";
import "./components/shared/_reset.scss";
import Dashboard from "./components/dashboard";
import DashboardCustomer from "./components/dashboardCustomer";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./contexts/ProtectedRoute";
import RedirectIfLoggedIn from "./contexts/RedirectIfLoggedIn";

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
    path: "/dashboard/customer",
    element: <ProtectedRoute children={<DashboardCustomer />} />,
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

// TODO
// Improve authentication router:
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

export default function App() {
  return <AuthProvider children={<RouterProvider router={router} />} />;
}
