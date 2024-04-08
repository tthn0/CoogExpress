import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import { useParams } from "react-router-dom";

const Inventory = () => {
  const [inventory, setInventory] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/inventory?id=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data for that resource");
        return res.json();
      })
      .then((data) => {
        setInventory(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        alert(
          "Error occured while fetching branch's inventory. Check the console."
        );
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
      <h2>Inventory of BRANCH_NAME</h2>
      <div>
        <ul>
          {inventory.map((inv) => (
            <li key={inv.id}>
              <h3>{inv.product_id}</h3>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Inventory;
