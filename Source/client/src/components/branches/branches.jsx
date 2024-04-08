import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

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
    <h2>List of Post Office Branches</h2>
      <div>
        <ul>
          {branches.map((branch) => (
            <li key={branch.id}>
              <h3>{branch.name}</h3>
              <p><strong>Address: </strong>{ branch.line1.concat("\n", branch.city, "\n", branch.state, "\n", branch.zip) }</p>
              <p><strong>Manager: </strong>{ branch.manager_first_name.concat(" ", branch.manager_last_name) }</p>
              <p><strong>Phone Number: </strong>{ branch.phone_number }</p>
              <p><strong>Email: </strong>{ branch.email }</p>
              <p><strong>Opening Time: </strong>{ branch.opening_time }</p>
              <p><strong>Closing Time: </strong>{ branch.closing_time }</p>
              <br/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Branches;
