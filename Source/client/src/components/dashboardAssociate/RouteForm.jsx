import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Button from "../shared/Button";
import styles from "./DashboardAssociate.module.scss";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

export default function RouteForm() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    start_address_id: user.branch_address_id,
    distance: Math.random() * 500,
  });
  const [allPackages, setAllPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/package`)
      .then((response) => response.json())
      .then((data) =>
        data.filter(
          (p) => p.source_branch_id === user.branch_id && p.status === "Pending"
        )
      )
      .then((data) => setAllPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, [isLoading]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedPackages((prev) => {
      if (prev.includes(value)) {
        return prev.filter((p) => p !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`${SERVER_BASE_URL}/route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, packages: selectedPackages }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
        } else {
          alert("Route created successfully!");
        }
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}. Check the consnole.`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div id={styles.formContainer}>
      <h1 id={styles.heading}>Create New Route</h1>
      <p id={styles.paragraph}>
        Please select the packages that you would like to be included on this
        route.
      </p>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <h2 className={styles.subHeading}>Select Packages</h2>
        <table id={styles.table}>
          <tr>
            <th>{/* Empty space for checkbox */}</th>
            <th>Package ID</th>
            <th>Length</th>
            <th>Width</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Speed</th>
            <th>Destination</th>
          </tr>
          {allPackages.map((p, i) => (
            <tr key={p.package_id}>
              <td>
                <input
                  type="checkbox"
                  name={p.package_id}
                  value={p.package_id}
                />
              </td>
              <td>
                <pre>{p.package_id}</pre>
              </td>
              <td>
                <pre>{p.length}</pre>
              </td>
              <td>
                <pre>{p.width}</pre>
              </td>
              <td>
                <pre>{p.height}</pre>
              </td>
              <td>
                <pre>{p.weight}</pre>
              </td>
              <td>
                <pre>{p.speed}</pre>
              </td>
              <td>
                {p.destination_address_line1}
                <br />
                {p.destination_address_line2
                  ? p.destination_address_line2 + <br />
                  : null}
                {p.destination_address_city}, {p.destination_address_state}{" "}
                {p.destination_address_zip}
              </td>
            </tr>
          ))}
        </table>

        <h2 className={styles.subHeading}>Summary</h2>
        <h3 className={styles.h3}>Estimated Distance</h3>
        <pre>296 mi</pre>
        <h3 className={styles.h3}>Estimated Time</h3>
        <pre>8h 39m </pre>
        <h3 className={styles.h3}>Estimated Fuel</h3>
        <pre>10 gal</pre>

        <Button
          className={styles.submit}
          text="Create Route"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
