import { useContext, useEffect, useState } from "react";
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
import Input from "../shared/Input";
import Button from "../shared/Button";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const fetchPackages = async (routeId, setPackages) => {
  const response = await fetch(
    `${SERVER_BASE_URL}/shipment?route_id=${routeId}`
  );
  const shipmentRows = await response.json();
  const packages = await Promise.all(
    shipmentRows.map(async (row) => {
      const response = await fetch(
        `${SERVER_BASE_URL}/package?package_id=${row.package_id}`
      );
      const packageInArray = await response.json();
      return packageInArray[0]; // Since the API returns an array
    })
  );
  const undeliveredPackages = packages.filter(
    (pkg) => pkg.status !== "Delivered"
  );
  setPackages(undeliveredPackages);
};
const fetchBranch = async (branchId, setBranch) => {
  const response = await fetch(
    `${SERVER_BASE_URL}/branch?branch_id=${branchId}`
  );
  const branch = await response.json();
  setBranch(branch[0]); // Since the API returns an array
};

export default function DashboardDriver({ route }) {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [destinationBranch, setDestinationBranch] = useState({});

  useEffect(() => {
    try {
      fetchPackages(route.route_id, setPackages);
      fetchBranch(route.destination_branch_id, setDestinationBranch);
    } catch (error) {
      console.error(`Error: ${error.message}`, error.message, error);
    }
  }, []);

  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const responses = await Promise.all(
      packages.map(async (pkg) => {
        return fetch(`${SERVER_BASE_URL}/tracking_history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            package_id: pkg.package_id,
            ...data,
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

    // Update all packages so that they are pending at the destination branch.
    // Navigate to home driving dashboard
    // Update route end timestamp

    alert("TODO");
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    // Navigate to home driving dashboard
    // Update route end timestamp

    alert("TODO");
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
        <pre>{`${destinationBranch.line1}\n${
          destinationBranch.line2 && destinationBranch.line2 + "\n"
        }${destinationBranch.city}, ${destinationBranch.state} ${
          destinationBranch.zip
        }`}</pre>

        {destinationBranch.branch_id !== user.branch_id && (
          <>
            <h2 className={styles.subHeading}>Unload All Packages</h2>
            <p className={styles.paragraph}>
              Once you have arrived at the destination branch, please unload all
              packages and drop them off at the branch.
            </p>
            <Button
              className={styles.button}
              text="Unload Packages & Checkout"
              onClick={handleUnloadPackages}
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
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="line2"
                label="Address Line 2"
                icon={faBuilding}
                required={false}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="city"
                label="City"
                icon={faLocationDot}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="state"
                label="State"
                icon={faMapPin}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="zip"
                label="Zip"
                icon={faLocationArrow}
              />
              <Button className={styles.button} text="Update Location" />
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
                        {pkg.destination_address_line1}
                        {pkg.destination_address_line2}
                        {pkg.destination_address_city}
                        {pkg.destination_address_state}
                        {pkg.destination_address_zip}
                      </td>
                      <td>{pkg.type}</td>
                      <td>{`
                      ${pkg.length}×${pkg.width}×${pkg.height}
                    `}</td>
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
