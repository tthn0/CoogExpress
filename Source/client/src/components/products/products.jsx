import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import NavBar from "../shared/NavBar";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/product`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data for that resource");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        alert("Error occured while fetching products. Check the console.");
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
      <div className={styles.checkout}>
        <h2>Summary</h2>
        <div>
          <div className={styles.checkoutBlock}>
           <text>Sub Total: </text>
           <text className={styles.cost}>$0</text>
          </div>
          <div className={styles.checkoutBlock}> 
            <text>Shipping and Handling: </text>
            <text className={styles.cost}>$0</text>
          </div>
          <div className={styles.checkoutBlock}>
            <text>Tax:  </text>
            <text className={styles.cost}>$0</text>
          </div>
          <div className={styles.divider} />
          <div className={styles.checkoutBlock}>
            <h3>Total: </h3>
            <text className={styles.cost}>$0</text>
          </div>
          <button>Checkout</button>
        </div>
      </div>

      <div className={styles.productsContainer}>
        <h2>List of Products</h2>
        <div>
          <ul>
            {products.map((prod) => (
              <li key={prod.id} className={styles.productItem}>
                <img src={prod.image || "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"} alt="branch image" />
                <h3>{prod.name}</h3>
                <p><strong>Description: </strong>{prod.description}</p>
                <p><strong>Price: </strong>${prod.price}</p>
                <button className={styles.button}>Add to cart</button>
                <label htmlFor="Qty">Qty:</label>
                <select name="Qty" id="Qty">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );  
};

export default Products;
