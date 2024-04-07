import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../shared/NavBar";
import Route from "./Route";
import SelectRoute from "./SelectRoute";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

export default function DashboardDriver() {
  const { user } = useContext(AuthContext);
  const { routeId } = useParams();
  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await fetch(
        `${SERVER_BASE_URL}/route?source_branch_id=${user.branch_id}`
      );
      const routes = await response.json();
      const routesNotStarted = routes.filter(
        (route) => route.start_timestamp === null
      );
      setRoutes(routesNotStarted);
      setRoutesLoading(false);
    };
    fetchRoutes();
  }, []);

  return (
    <>
      <NavBar />
      {!routesLoading && routeId ? <Route /> : <SelectRoute routes={routes} />}
    </>
  );
}
