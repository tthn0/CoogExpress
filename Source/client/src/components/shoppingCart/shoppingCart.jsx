import { useEffect, useState, useContext } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { user } = useContext(AuthContext);
  const [userCart, setUserCart] = useState({});
  const [branches, setBranches] = useState({});
  const [isPending, setIsPending] = useState({
    shopping_cart: true,
    branches: true
  });
  const [error, setError] = useState({
    shopping_cart: null,
    branches: null
  });

  const [form, setForm] = useState({
    customer_id: 4,
    branch_id: 2,
    product_id: 4,
    billing_id: 46,
    amount_bought: 2,
    subtotal: 29.99,
    tax: 2.89,
    total: 37.87,
    notes: ""
  })

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
      convertDataToCart(data);
      setIsPending((prevState) => ({
        ...prevState,
        shopping_cart: false
      }));
      setError((prevState) => ({
        ...prevState,
        shopping_cart: null
      }));
    })
    .catch((err) => {
      alert("Error occured while fetching products. Check the console.");
      setIsPending((prevState) => ({
        ...prevState,
        shopping_cart: false
      }));
      setError((prevState) => ({
        ...prevState,
        shopping_cart: err.message
      }));
    });

    fetch(`${SERVER_BASE_URL}/branch`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch the data for that resource");
        return res.json();
      })
      .then((data) => {
        let newData = {}
        data.forEach(branch => {
          const { branch_id, ...branchInfo} = branch
          newData[branch_id] = branchInfo
        })
        setBranches(newData);
        setIsPending((prevState) => ({
          ...prevState,
          branches: false
        }));
        setError((prevState) => ({
          ...prevState,
          branches: null
        }));
      })
      .catch((err) => {
        alert("Error occured while fetching branches. Check the console.");
        setIsPending((prevState) => ({
          ...prevState,
          branches: false
        }));
        setError((prevState) => ({
          ...prevState,
          branches: err.message
        }));
      });
  }, [])

  useEffect(() => updatePricing(userCart), [userCart])

  const updatePricing = (cart) => {
    console.log(cart)
    if(cart === null)
      cart = userCart;
    console.log(cart)
    let newSubTotal = 0;
    Object.values(cart).forEach(branch => {
        Object.values(branch).forEach(product => {
            newSubTotal += product.price * product.quantity;
        });
    });
    setSubTotal(newSubTotal);
    setShipping(4.99);
    const newTax = (newSubTotal + 4.99) * 0.0825;
    setTax(newTax);
    setTotal(newSubTotal + 4.99 + newTax);
  }

  const convertDataToCart = (data) => {
    let currentCart = userCart;
    data.map((item) => {
      if(!currentCart[item.branch_id])
        currentCart[item.branch_id] = {};

      const branchItems = currentCart[item.branch_id];
      branchItems[item.product_id] = {
        image: item.product_image,
        quantity: item.product_quantity, 
        price: item.price 
      };
    })
    setUserCart(currentCart);
    updatePricing(currentCart)
  }

  const handleCheckout = () => {
    fetch(`${SERVER_BASE_URL}/receipt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.errno) {
        alert(`An error occurred: ${data.message}. Check the console.`);
        console.log(data);
      } else {
        console.log(data);
        alert("Successfully purchased item(s)!");
      }
    })
    .catch((error) => {
      alert(`An error occurred: ${error.message}. Check the consnole.`);
      console.log(error);
    })
    setUserCart({})
  }

  const handleRemoveItem = (branch_id, product_id) => {
    fetch(`${SERVER_BASE_URL}/shopping_cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        branch_id: branch_id,
        product_id: product_id
       })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.errno) {
        alert(`An error occurred: ${data.message}. Check the console.`);
        console.log(data);
      } else {
        console.log(data);
        alert("Successfully deleted item(s)!");
      }
    })
    .catch((error) => {
      alert(`An error occurred: ${error.message}. Check the consnole.`);
      console.log(error);
    })
  }

  if (isPending.branches || isPending.shopping_cart) {
    return <div>Loading...</div>;
  }

  if (error.branches || isPending.shopping_cart) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.shoppingCart}>
        <h2>Shopping Cart</h2>
        <div className={styles.cartItems}>
          {Object.entries(userCart).map(([branch_id, item]) => (
            <>
              <h3>{branches[branch_id].name}</h3>
              {Object.entries(item).map(([product_id, product]) => (
                <>
                  <div key={product_id} className={styles.cartItem}>
                    <img src={product.image} alt={product.name} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <h3>{product.name}</h3>
                      <p>Price: ${product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <button onClick={() => handleRemoveItem(branch_id, product_id)}>Remove</button>
                    </div>
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
        <div className={styles.totalPrice}>
          <div>
            <h4>Sub Total Price: ${subTotal.toFixed(2)}</h4>
            <h4>Shipping Price: ${shipping.toFixed(2)}</h4>
            <h4>Tax Price: ${tax.toFixed(2)}</h4> <br/>
            <h3>Total Price: ${total.toFixed(2)}</h3>
          </div>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </>
  );
};

export default ShoppingCart;