import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faLocationDot,
  faMapPin,
  faLocationArrow,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./DashboardDriver.module.scss";
import Input, { VALIDATORS } from "../shared/Input";
import Button from "../shared/Button";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const fetchRoute = async (routeId, setRoute) => {
  const response = await fetch(`${SERVER_BASE_URL}/route?route_id=${routeId}`);
  const routeArray = await response.json();
  const route = routeArray[0];
  setRoute(route); // Since the API returns an array
  return route;
};

const fetchPackages = async (routeId, setPackages) => {
  const [route, shipmentRows] = await Promise.all([
    fetch(`${SERVER_BASE_URL}/route?route_id=${routeId}`)
      .then((response) => response.json())
      .then((data) => data[0]), // Since the API returns an array
    fetch(`${SERVER_BASE_URL}/shipment?route_id=${routeId}`).then((response) =>
      response.json()
    ),
  ]);

  console.log(route);

  const packages = await Promise.all(
    shipmentRows.map(async (row) => {
      const response = await fetch(
        `${SERVER_BASE_URL}/package?package_id=${row.package_id}`
      );
      const packageInArray = await response.json();

      return packageInArray[0]; // Since the API returns an array
    })
  );

  if (route.source_branch_id === route.destination_branch_id) {
    // If going back to home branch
    const undeliveredPackages = packages.filter(
      (pkg) => pkg.status !== "Delivered"
    );
    setPackages(undeliveredPackages);
  } else {
    // If dropping off at another branch
    const packagesNotAtDestinationBranch = packages.filter(
      (pkg) => pkg.current_address_id !== route.destination_branch_address_id
    );
    setPackages(packagesNotAtDestinationBranch);
  }
};
const fetchBranch = async (branchId, setBranch) => {
  const response = await fetch(
    `${SERVER_BASE_URL}/branch?branch_id=${branchId}`
  );
  const branch = await response.json();
  setBranch(branch[0]); // Since the API returns an array
};

export default function Route() {
  const { user } = useContext(AuthContext);
  const [route, setRoute] = useState({});
  const [packages, setPackages] = useState([]);
  const [destinationBranch, setDestinationBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { routeId } = useParams();

  useEffect(() => {
    try {
      fetchRoute(routeId, setRoute).then((route) => {
        Promise.all([
          fetchPackages(route.route_id, setPackages),
          fetchBranch(route.destination_branch_id, setDestinationBranch),
        ]);
      });
    } catch (error) {
      console.error(`Error: ${error.message}`, error.message, error);
    }
  }, []);

  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const parsedAddress = Object.fromEntries(formData.entries());

    setLoading(true);

    const responses = await Promise.all(
      packages.map(async (pkg) => {
        return fetch(`${SERVER_BASE_URL}/tracking_history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            package_id: pkg.package_id,
            ...parsedAddress,
            status: "Shipping",
          }),
        });
      })
    );

    for (const response of responses) {
      if (response.errno) {
        alert("Error updating location. Check console.");
        console.error("Error updating location:", response);
        return;
      }
    }

    alert("Locations updated successfully.");
    setLoading(false);
  };

  const handleDropOff = (pkg) => {
    return (e) => {
      e.preventDefault();

      fetch(`${SERVER_BASE_URL}/tracking_history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package_id: pkg.package_id,
          line1: pkg.destination_address_line1,
          line2: pkg.destination_address_line2,
          city: pkg.destination_address_city,
          state: pkg.destination_address_state,
          zip: pkg.destination_address_zip,
          status: "Delivered",
        }),
      })
        .then((response) => {
          if (response.errno) {
            alert("Error updating location. Check console.");
            console.error("Error updating location:", response);
            return;
          }

          // remove packge from state
          setPackages(packages.filter((p) => p.package_id !== pkg.package_id));

          alert("Package dropped off successfully.");
        })
        .catch((error) => {
          alert("Error updating location. Check console.");
          console.error("Error updating location:", error);
        });
    };
  };

  const handleUnloadPackages = async (e) => {
    e.preventDefault();

    setLoading(true);

    const results = await Promise.all(
      packages.map((pkg) => {
        return fetch(`${SERVER_BASE_URL}/tracking_history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            package_id: pkg.package_id,
            line1: route.destination_branch_line1,
            line2: route.destination_branch_line2,
            city: route.destination_branch_city,
            state: route.destination_branch_state,
            zip: route.destination_branch_zip,
            status: "Pending",
          }),
        })
          .then((response) => {
            if (response.errno) {
              alert("Error dropping off. Check console.");
              console.error("Error dropping off:", response);
              return;
            }
            return response.json();
          })
          .catch((error) => {
            alert("Error dropping off. Check console.");
            console.error("Error dropping off:", error);
          });
      })
    );

    // Todo: loop over results to check for errors

    setPackages([]);

    setLoading(false);
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    setLoading(true);

    const dateToSqlDatetime = (date) =>
      date.toISOString().slice(0, 19).replace("T", " ");

    fetch(`${SERVER_BASE_URL}/route`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...route,
        id: route.route_id,
        start_timestamp: dateToSqlDatetime(new Date(route.start_timestamp)),
        end_timestamp: dateToSqlDatetime(new Date()),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errno) {
          alert(`Error checking out: ${data.message} Check console.`);
          console.error("Error checking out:", data);
          return;
        }
        alert("Checked out successfully.");
        navigate("/dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id={styles.container}>
      <main id={styles.innerContainer}>
        <h1 id={styles.heading}>Driver Dashboard</h1>
        <p className={styles.paragraph}>
          Please make sure to update your current location periodically, so
          customers can see the most up-to-date location of their packages.
        </p>

        <h2 className={styles.subHeading}>Final Destination</h2>
        <h3 className={styles.h3}>Branch Name</h3>
        <pre>{destinationBranch.name}</pre>
        <h3 className={styles.h3}>Branch Address</h3>
        <pre>
          <div>{destinationBranch.line1}</div>
          <div>{destinationBranch.line2}</div>
          <div>
            {destinationBranch.city}
            {", "}
            {destinationBranch.state} {destinationBranch.zip}
          </div>
        </pre>

        {destinationBranch.branch_id !== user.branch_id &&
          packages.length !== 0 && (
            <>
              <h2 className={styles.subHeading}>Unload All Packages</h2>
              <p className={styles.paragraph}>
                Once you have arrived at the destination branch, please unload
                all packages and drop them off at the branch.
              </p>
              <Button
                className={styles.button}
                text="Unload Packages"
                onClick={handleUnloadPackages}
                isLoading={loading}
              />
            </>
          )}

        <h2 className={styles.subHeading}>
          {packages.length === 0 ? "Route Complete" : "Update Location"}
        </h2>
        {packages.length === 0 ? (
          <>
            <Button
              className={styles.button}
              text="Check Out"
              onClick={handleCheckOut}
              isLoading={loading}
            />
          </>
        ) : (
          <>
            <p className={styles.paragraph}>
              Use this form to update the location of all packages in your
              route.
            </p>
            <form id={styles.form} onSubmit={handleUpdateLocation}>
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="line1"
                label="Address Line 1"
                icon={faHome}
                {...VALIDATORS.ADDRESS_LINE_1}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="line2"
                label="Address Line 2"
                icon={faBuilding}
                required={false}
                {...VALIDATORS.ADDRESS_LINE_2}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="city"
                label="City"
                icon={faLocationDot}
                {...VALIDATORS.CITY}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="state"
                label="State"
                icon={faMapPin}
                {...VALIDATORS.STATE}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="zip"
                label="Zip"
                icon={faLocationArrow}
                {...VALIDATORS.ZIP}
              />
              <Button
                className={styles.button}
                text="Update Location"
                isLoading={loading}
              />
            </form>
          </>
        )}
        {packages.length > 0 && (
          <>
            <h2 className={styles.subHeading}>Packages On Route</h2>
            <div id={styles.tableContainer}>
              <table id={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Receiver</th>
                    <th>Destination Address</th>
                    <th>Type</th>
                    <th>Dimensions (L×W×H cm)</th>
                    <th>Weight (lbs)</th>
                    <th>Special Handling Instructions</th>
                    <th>Delivery Instructions</th>
                    {user.branch_id === destinationBranch.branch_id && (
                      <th>Drop Off</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.package_id}>
                      <td>{pkg.package_id}</td>
                      <td>
                        {pkg.receiver_first_name} {pkg.receiver_last_name}
                      </td>
                      <td>
                        <div>{pkg.destination_address_line1}</div>
                        <div>{pkg.destination_address_line2}</div>
                        <div>
                          {pkg.destination_address_city}
                          {", "}
                          {pkg.destination_address_state}{" "}
                          {pkg.destination_address_zip}
                        </div>
                      </td>
                      <td>{pkg.type}</td>
                      <td>{`${pkg.length}×${pkg.width}×${pkg.height}`}</td>
                      <td>{pkg.weight} lbs</td>
                      <td>{pkg.special_handling_instructions}</td>
                      <td>{pkg.delivery_instructions}</td>
                      {user.branch_id === destinationBranch.branch_id && (
                        <td>
                          <button
                            id={styles.dropOff}
                            onClick={handleDropOff(pkg)}
                          >
                            <FontAwesomeIcon icon={faSquareCheck} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
