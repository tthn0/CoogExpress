import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Button from "../shared/Button";
import styles from "./DashboardAssociate.module.scss";
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

export default function RouteForm() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    source_branch_id: user.branch_id,
    destination_branch_id: null,
    packages: [],
  });
  const [allPackages, setAllPackages] = useState([]);
  const [selectedPackagesById, setSelectedPackagesById] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([]);

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

    fetch(`${SERVER_BASE_URL}/branch`)
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error("Error fetching branches:", error));
  }, [isLoading]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (e.target.type === "select-one") {
      setForm((prev) => ({ ...prev, [e.target.name]: value }));
    } else if (e.target.type === "checkbox") {
      setSelectedPackagesById((prev) => {
        if (prev.includes(value)) {
          return prev.filter((p) => p !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPackagesById.length === 0) {
      alert("Please select at least one package.");
      return;
    }

    setIsLoading(true);

    fetch(`${SERVER_BASE_URL}/route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, packages: selectedPackagesById }),
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

  const estimates = estimateRouteSummary(selectedPackagesById.length);

  return (
    <div id={styles.formContainer}>
      <h1 id={styles.heading}>Create New Route</h1>
      <p className={styles.paragraph}>
        Please select the packages that you would like to be included on this
        route.
      </p>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <h2 className={styles.subHeading}>Select Packages</h2>
        <div id={styles.tableContainer}>
          <table id={styles.table}>
            <thead>
              <tr>
                <th>{/* Empty space for checkbox */}</th>
                <th>Package ID</th>
                <th>Sender Username</th>
                <th>Receiver Username</th>
                <th>Length</th>
                <th>Width</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Speed</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
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
                    <pre>{p.sender_username}</pre>
                  </td>
                  <td>
                    <pre>{p.receiver_username}</pre>
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
            </tbody>
          </table>
        </div>

        <h2 className={styles.subHeading}>Select Destination Branch</h2>

        <select id={styles.select} name="destination_branch_id">
          <option value="" selected disabled hidden>
            Choose a branch
          </option>
          {branches.map((branch) => (
            <option value={branch.branch_id}>{branch.name}</option>
          ))}
        </select>
        <p className={styles.paragraph}>
          <strong>Important</strong>: if the destination branch isn't the same
          as the current branch, the packages will be transferred to the
          selected branch. The packages should not be delivered to their final
          destination. The destination branch will be responsible for delivering
          the packages.
        </p>

        <h2 className={styles.subHeading}>Summary</h2>
        <h3 className={styles.h3}>Estimated Time</h3>
        <pre>{estimates.time}</pre>
        <h3 className={styles.h3}>Estimated Fuel</h3>
        <pre>{estimates.fuel} gal</pre>
        <h3 className={styles.h3}>Estimated Distance</h3>
        <pre>{estimates.distance} mi</pre>

        <Button
          className={styles.submit}
          text="Create Route"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
