import { useEffect, useState, useContext } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { user } = useContext(AuthContext);
  const [userCart, setUserCart] = useState({});
  const [currentBranch_id, setCurrentBranch_id] = useState(0);
  const [branches, setBranches] = useState({});
  const [inventory, setInventory] = useState({});
  const [isPending, setIsPending] = useState({
    shopping_cart: true,
    branches: true,
    inventory: true,
  });
  const [error, setError] = useState({
    shopping_cart: null,
    branches: null,
    inventory: null,
  });

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
        if (data.length > 0) 
          setCurrentBranch_id(data[0].branch_id);
        convertDataToCart(data);
        setIsPending((prevState) => ({
          ...prevState,
          shopping_cart: false,
        }));
        setError((prevState) => ({
          ...prevState,
          shopping_cart: null,
        }));
      })
      .catch((err) => {
        alert("Error occured while fetching products. Check the console.");
        setIsPending((prevState) => ({
          ...prevState,
          shopping_cart: false,
        }));
        setError((prevState) => ({
          ...prevState,
          shopping_cart: err.message,
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
        let newData = {};
        data.forEach((branch) => {
          const { branch_id, ...branchInfo } = branch;
          newData[branch_id] = branchInfo;
        });
        setBranches(newData);
        setIsPending((prevState) => ({
          ...prevState,
          branches: false,
        }));
        setError((prevState) => ({
          ...prevState,
          branches: null,
        }));
      })
      .catch((err) => {
        alert("Error occured while fetching branches. Check the console.");
        setIsPending((prevState) => ({
          ...prevState,
          branches: false,
        }));
        setError((prevState) => ({
          ...prevState,
          branches: err.message,
        }));
      });
  }, []);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/inventory?branch_id=${currentBranch_id}`)
      .then((response) => response.json())
      .then((data) => {
        convertDataToInventory(data);
        setIsPending((prevState) => ({
          ...prevState,
          inventory: false,
        }));
        setError((prevState) => ({
          ...prevState,
          inventory: null,
        }));
      })
      .catch((err) => {
        alert("Error occured while fetching inventory. Check the console.");
        setIsPending((prevState) => ({
          ...prevState,
          inventory: false,
        }));
        setError((prevState) => ({
          ...prevState,
          inventory: err.message,
        }));
      });
  }, [currentBranch_id]);

  useEffect(() => updatePricing(userCart), [userCart]);

  const convertNumberToPrice = (num) => {
    const price = num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return price;
  };

  const updatePricing = (cart) => {
    if (cart === null) cart = userCart;
    let newSubTotal = 0;
    Object.values(cart).forEach((product) => {
      newSubTotal += product.price * product.quantity;
    });
    setSubTotal(newSubTotal);
    let shippingCost = 0;
    if (Object.keys(cart).length !== 0) {
      shippingCost = 4.99;
    } else {
      shippingCost = 0;
    }
    setShipping(shippingCost);
    const newTax = (newSubTotal + shippingCost) * 0.0825;
    setTax(newTax);
    setTotal(newSubTotal + shippingCost + newTax);
  };

  const convertDataToCart = (data) => {
    let currentCart = userCart;
    data.map((item) => {
      if (!currentCart[item.product_id]) currentCart[item.product_id] = {};

      currentCart[item.product_id] = {
        name: item.product_name,
        shopping_cart_id: item.shopping_cart_id,
        image: item.product_image,
        quantity: item.product_quantity,
        price: item.price,
      };
    });
    setUserCart(currentCart);
    updatePricing(currentCart);
  };

  // inventory[product_id] = stock
  const convertDataToInventory = (data) => {
    let currentInventory = {};
    data.map((item) => {
      if (!currentInventory[item.product_id])
        currentInventory[item.product_id] = {};

      currentInventory[item.product_id] = item.quantity_in_stock;
    });
    setInventory(currentInventory);
  };

  const handleCheckout = () => {
    if(Object.entries(userCart).length === 0)
      return;

    if (!user.billing_id) {
      alert("You must have a card on file to buy stuff.");
      return;
    }

    for (const productId of Object.keys(userCart)) {
      const quantity = userCart[productId].quantity;
      if (inventory[productId] < quantity) {
        alert("Not enough inventory");
        return;
      }
    };

    fetch(`${SERVER_BASE_URL}/process_cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        branch_id: currentBranch_id,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
        }
      })
      .catch((err) => {
        alert(`An error occurred: ${error.message}. Check the consnole.`);
        console.log(err);
      })

    setCurrentBranch_id(0);
    setUserCart({});
    alert("Purchase was successful!");
  };

  const handleRemoveItem = (product_id) => {
    fetch(`${SERVER_BASE_URL}/shopping_cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
        }
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}. Check the consnole.`);
        console.log(error);
      });
      let cart = {...userCart}
      delete cart[product_id]
      setUserCart(cart);
  };

  const handleQuantityChange = (product_id, value) => {
    value = Math.min(Math.max(value, 1), 20)
    let cart =  {...userCart }
    cart[product_id].quantity = value;

    fetch(`${SERVER_BASE_URL}/shopping_cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: cart[product_id].shopping_cart_id,
        quantity: value
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.errno) {
        alert(`An error occurred: ${data.message}. Check the console.`);
        console.log(data);
      }
    })
    .catch((err) => {
      alert(`An error occurred: ${error.message}. Check the consnole.`);
      console.log(error);
    })

    setUserCart(cart);
  }

  if (isPending.branches || isPending.shopping_cart || isPending.inventory) {
    return <div>Loading...</div>;
  }

  if (error.branches || error.shopping_cart || error.inventory) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.shoppingCart}>
        <h2>Shopping Cart</h2>
        <div className={styles.cartItems}>
          {currentBranch_id !== 0 && <h3>{branches[currentBranch_id].name}</h3>}
          {Object.entries(userCart).map(([product_id, product]) => (
            <>
              <div key={product_id} className={styles.cartItem}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{product.name}</h3>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p>
                    <strong>Quantity:</strong>
                    <input
                      id={product_id}
                      type="number"
                      value={product.quantity}
                      min="1"
                      max="20"
                      onChange={(e) => handleQuantityChange(product_id, e.target.value)}
                    />
                  </p>
                  <button onClick={() => handleRemoveItem(product_id)}>
                    Remove
                  </button>
                  <text>Subtotal: {convertNumberToPrice(parseFloat(product.price) * parseInt(product.quantity))}</text>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={styles.totalPrice}>
          <div>
            <h4>Sub Total Price: {convertNumberToPrice(subTotal)}</h4>
            <h4>Shipping Price: {convertNumberToPrice(shipping)}</h4>
            <h4>Tax Price: {convertNumberToPrice(tax)}</h4> <br />
            <h3>Total Price: {convertNumberToPrice(total)}</h3>
          </div>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
