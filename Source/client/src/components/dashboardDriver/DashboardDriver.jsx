import { useEffect, useState } from "react";
import styles from "./DashboardDriver.module.scss";

import NavBar from "../shared/NavBar";
import Input from "../shared/Input";
import Button from "../shared/Button";

import {
  faHome,
  faBuilding,
  faLocationDot,
  faMapPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

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
  setPackages(packages);
};
const fetchBranch = async (branchId, setBranch) => {
  const response = await fetch(
    `${SERVER_BASE_URL}/branch?branch_id=${branchId}`
  );
  const branch = await response.json();
  setBranch(branch[0]); // Since the API returns an array
};

export default function DashboardDriver() {
  const [packages, setPackages] = useState([]);
  const [branch, setBranch] = useState({});

  const routeId = 1;
  const branchId = 1;

  useEffect(() => {
    try {
      fetchPackages(routeId, setPackages);
      fetchBranch(branchId, setBranch);
    } catch (error) {
      console.error(`Error: ${error.message}`, error.message, error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // const response = await fetch(
    //   `${SERVER_BASE_URL}/route?route_id=${routeId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    // if (response.ok) {
    //   alert("Location updated successfully");
    // } else {
    //   alert("Failed to update location");
    // }
  };

  return (
    <>
      <NavBar />
      <div id={styles.container}>
        <main id={styles.innerContainer}>
          <h1 id={styles.heading}>Driver Dashboard</h1>
          <p id={styles.paragraph}>
            Please make sure to update your current location periodically, so
            customers can see the most up-to-date location of their packages.
          </p>

          <h2 className={styles.subHeading}>Final Destination</h2>
          <h3 className={styles.h3}>Branch Name</h3>
          <pre>{branch.name}</pre>
          <h3 className={styles.h3}>Branch Address</h3>
          <pre>{`${branch.line1}\n${branch.line2}\n${branch.city}, ${branch.state} ${branch.zip}`}</pre>

          <form id={styles.form} onSubmit={handleSubmit}>
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
            {/* Change this to checkout once there are no more packages */}
          </form>
          <h2 className={styles.subHeading}>Packages On Route</h2>
          <div className={styles.tableContainer}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
