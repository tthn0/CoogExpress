import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import NavBar from "../shared/NavBar";
import styles from "./Inventory.module.css";

const Inventory = () => {
  const [inventory, setInventory] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const { branchId } = useParams();

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/inventory?branch_id=${branchId}`, {
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

  if(inventory.length == 0){
    return <div>This branch does not exist</div>
  }

  return (
    <>
      <NavBar />
      <div className={styles.inventoryContainer}>
        <h2>Inventory of {inventory[0].branch_name}</h2>
        <div>
          <ul>
            {inventory.map((inv) => (
              <li key={inv.id} className={styles.inventoryItem}>
                <h3>{inv.product_name}</h3>
                <p><strong>Product ID:</strong> {inv.product_id}</p>
                <p><strong>Current Stock:</strong> {inv.quantity_in_stock}</p>
                <p><strong>Stock Alert:</strong> {inv.stock_alert_threshold}</p>
                <p><strong>Last Stock Update:</strong> {inv.last_stock_update}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );  
};

export default Inventory;