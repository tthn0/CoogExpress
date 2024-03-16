import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./components/shared/_reset.scss";

import History from "./components/history";
import Home from "./components/home";
import Login from "./components/login";
// import Profile from "./components/profile";
// import Quote from "./components/quote";
import Register from "./components/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
  // {
  //   path: "/quote",
  //   element: <Quote />,
  // },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
