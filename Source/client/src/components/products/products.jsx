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
      <div className={styles.productsContainer}>
        <h2>List of Products</h2>
        <div>
          <ul>
            {products.map((prod) => (
              <li key={prod.id} className={styles.productItem}>
                <h3>{prod.name}</h3>
                <p><strong>Description: </strong>{prod.description}</p>
                <p><strong>Price: </strong>${prod.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );  
};

export default Products;
