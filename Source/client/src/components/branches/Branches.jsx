import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import NavBar from "../shared/NavBar";
import styles from "./Branches.module.scss";

const convertPhoneNumber = (pNum) => {
  try {
    const cleaned = pNum.replace(/\D/g, "");
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
      3,
      6
    )}-${cleaned.substring(6, 10)}`;
  } catch {
    return pNum;
  }
};

const Branches = () => {
  const [branches, setBranches] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/branch`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data for that resource");
        return res.json();
      })
      .then((data) => {
        setBranches(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        alert("Error occured while fetching branches. Check the console.");
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.branchesContainer}>
        <h2>List of Post Office Branches</h2>
        <div>
          <ul>
            {branches.map((branch) => (
              <li key={branch.id} className={styles.branchItem}>
                <img
                  src={
                    branch.image ||
                    "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
                  }
                  alt="Branch"
                />
                <h3>{branch.name}</h3>
                <p>
                  <strong>Address: </strong>
                  {branch.line1.concat(
                    "\n",
                    branch.city,
                    "\n",
                    branch.state,
                    "\n",
                    branch.zip
                  )}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {convertPhoneNumber(branch.phone_number)}
                </p>
                <p>
                  <strong>Email: </strong>
                  {branch.email}
                </p>
                <p>
                  <strong>Opening Time: </strong>
                  {branch.opening_time}
                </p>
                <p>
                  <strong>Closing Time: </strong>
                  {branch.closing_time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Branches;
