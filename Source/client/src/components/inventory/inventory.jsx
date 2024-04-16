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
                <img 
                  className={styles.inventoryItemimg}
                  src={inv.product_image || "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"} 
                  alt="branch image" 
                />
                { inv.quantity_in_stock <= inv.stock_alert_threshold && (
                  <>
                    <div className={styles.alert} >
                      <img 
                        src="https://media.istockphoto.com/id/1152189152/vector/red-alert-icon.jpg?s=612x612&w=0&k=20&c=Kw_-i314F4cxgn2hmakp-88-O45FSx62c6r-OzKYMw4="
                        alt="Alert"
                      />
                      <text>Low Stock Alert!!!</text>
                    </div>
                  </>
                )}
                <h3>{inv.product_name}</h3>
                <p><strong>Product ID:</strong> {inv.product_id}</p>
                <p><strong>Current Stock:</strong> {inv.quantity_in_stock}</p>
                <p><strong>Stock Alert:</strong> {inv.stock_alert_threshold}</p>
                <p><strong>Last Stock Update:</strong> {inv.last_stock_update}</p>
                <input 
                  value="0"
                  type="number"
                  maxLength="5"
                />
                <button>Add Stock</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );  
};

export default Inventory;
