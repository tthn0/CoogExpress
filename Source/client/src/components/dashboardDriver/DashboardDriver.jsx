import NavBar from "../shared/NavBar";
import Driving from "./Driving";

import { useNavigate, useParams } from "react-router-dom";

import styles from "./DashboardDriver.module.scss";

import { useContext, useEffect, useState } from "react";

import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import Button from "../shared/Button";

const formatHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

const estimateRouteSummary = (numberOfPackages) => {
  return {
    time: formatHoursAndMinutes(numberOfPackages * 15),
    fuel: roundToTwoDecimals(numberOfPackages * 0.5),
    distance: roundToTwoDecimals(numberOfPackages * 5),
  };
};

function RouteCard({ route }) {
  const navigate = useNavigate();
  const estimates = estimateRouteSummary(route.package_count);

  const handleSelectRoute = (routeId) => {
    return (e) => {
      e.preventDefault();
      navigate(`/dashboard/driver/route/${routeId}`);
    };
  };

  return (
    <div className={styles.routeContainer}>
      <h2 className={styles.subHeading}>Route #{route.route_id}</h2>

      <h3 className={styles.h3}>Destination Branch</h3>
      <pre>{route.destination_branch_name}</pre>

      <h3 className={styles.h3}>Package Count</h3>
      <pre>{route.package_count}</pre>

      <h3 className={styles.h3}>Estimated Time</h3>
      <pre>{estimates.time}</pre>

      <h3 className={styles.h3}>Estimated Fuel</h3>
      <pre>{estimates.fuel} gal</pre>

      <h3 className={styles.h3}>Estimated Distance</h3>
      <pre>{estimates.distance} mi</pre>

      <Button
        className={styles.button}
        text="Select Route"
        onClick={handleSelectRoute(route.route_id)}
      />
    </div>
  );
}

function SelectRoute({ routes }) {
  const handleSelectRoute = (e) => {
    e.preventDefault();
    const route = e.target.route.value;
    console.log(`Route ${route} selected`);
  };

  return (
    <>
      <div id={styles.container}>
        <main id={styles.innerContainer}>
          <h1 id={styles.heading}>Driver Dashboard</h1>
          <p className={styles.paragraph}>
            Please select a route to begin your delivery.
          </p>
          {routes.map((route) => (
            <RouteCard key={route.route_id} route={route} />
          ))}
        </main>
      </div>
    </>
  );
}

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
      {!routesLoading && routeId ? (
        <Driving
          route={routes.find((route) => route.route_id === parseInt(routeId))}
        />
      ) : (
        <SelectRoute routes={routes} />
      )}
    </>
  );
}
