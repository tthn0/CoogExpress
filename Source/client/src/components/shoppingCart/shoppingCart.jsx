import { useEffect, useState, useContext } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { user } = useContext(AuthContext);
  const [userCart, setUserCart] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/shopping_cart?user_id=${user.user_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) throw Error("Could not fetch the data for that resource");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setUserCart(data);
      setIsPending(false);
      setError(null);
    })
    .catch((err) => {
      alert("Error occured while fetching products. Check the console.");
      setIsPending(false);
      setError(err.message);
    });
  }, [])

  const handleCheckout = () => {

  }

  const handleRemoveItem = () => {

  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.shoppingCart}>
        <h2>Shopping Cart</h2>
        <div className={styles.cartItems}>
          {Object.values(userCart).map((item) => (
            <div key={item.product_id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalPrice}>
          <h3>Total Price: ${total.toFixed(2)}</h3>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </>
  );
};

export default ShoppingCart;