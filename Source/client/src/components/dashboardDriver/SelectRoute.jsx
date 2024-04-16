import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import deliveredImage from "./images/Delivered.svg";
import styles from "./DashboardDriver.module.scss";
import Button from "../shared/Button";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const estimates = estimateRouteSummary(route.package_count);
  const [loading, setLoading] = useState(false);

  const handleSelectRoute = (routeId) => {
    return (e) => {
      e.preventDefault();

      setLoading(true);

      fetch(`${SERVER_BASE_URL}/route`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...route,
          id: route.route_id,
          driver_employee_id: user.employee_id,
          start_timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
          end_timestamp: null,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errno) {
            alert(`Error selecting route: ${data.message} Check console.`);
            console.error("Error selecting route:", data);
            return;
          }
          navigate(`/dashboard/driver/route/${routeId}`);
        })
        .finally(() => {
          setLoading(false);
        });
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
        isLoading={loading}
      />
    </div>
  );
}

export default function SelectRoute({ routes }) {
  return (
    <>
      <div id={styles.container}>
        <main id={styles.innerContainer}>
          <h1 id={styles.heading}>Driver Dashboard</h1>
          <p className={styles.paragraph}>
            {routes.length === 0
              ? "No routes available. All pending routes have been completed."
              : "Please select a route to begin your delivery."}
          </p>
          {routes.length === 0 && (
            <img
              id={styles.deliveredImage}
              src={deliveredImage}
              alt="No pending routes"
            />
          )}
          {routes.map((route) => (
            <RouteCard key={route.route_id} route={route} />
          ))}
        </main>
      </div>
    </>
  );
}
