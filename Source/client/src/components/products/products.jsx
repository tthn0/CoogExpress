import { useEffect, useState, useContext } from "react";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./Products.module.css";

const Products = () => {
  const { user } = useContext(AuthContext);
  const [branches, setBranches] = useState({});
  const [currentBranch_id, setCurrentBranch_id] = useState(1);
  const [products, setProducts] = useState({});
  const [inventory, setInventory] = useState({});
  const [isPending, setIsPending] = useState({
    shoppingCart: true,
    products: true,
    branches: true,
    inventory: true
  });
  const [error, setError] = useState({
    shoppingCart: null,
    products: null,
    branches: null,
    inventory: null
  });
  const [cart, setCart] = useState({});
  const [shoppingCartForm, setShoppingCartForm] = useState({
    user_id: 0,
    branch_id: 0,
    product_id: 0,
    quantity: 0,
    isNew: false
  })

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch checkout
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
        shoppingCart: false
      }));
      setError((prevState) => ({
        ...prevState,
        shoppingCart: null
      }));
    })
    .catch((err) => {
      alert("Error occured while fetching shopping cart. Check the console.");
      setIsPending((prevState) => ({
        ...prevState,
        shoppingCart: false
      }));
      setError((prevState) => ({
        ...prevState,
        shoppingCart: err.message
      }));
    });

    // Fetch products
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
      setIsPending((prevState) => ({
        ...prevState,
        products: false
      }));
      setError((prevState) => ({
        ...prevState,
        products: null
      }));
    })
    .catch((err) => {
      alert("Error occured while fetching products. Check the console.");
      setIsPending((prevState) => ({
        ...prevState,
        products: false
      }));
      setError((prevState) => ({
        ...prevState,
        products: err.message
      }));
    });

    // Fetch branches
    fetch(`${SERVER_BASE_URL}/branch`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) throw Error("Could not fetch the data for that resource");
      return res.json();
    })
    .then((data) => {
      setCurrentBranch_id(data[0].branch_id)
      setBranches(data);
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
      alert("Error occured while fetching products. Check the console.");
      setIsPending((prevState) => ({
        ...prevState,
        branches: false
      }));
      setError((prevState) => ({
        ...prevState,
        branches: err.message
      }));
    });
  }, []);

  useEffect(() => {
    // Fetch inventory
    fetch(`${SERVER_BASE_URL}/inventory?branch_id=${currentBranch_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) throw Error("Could not fetch the data for that resource");
      return res.json();
    })
    .then((data) => {
      const newData = {};
      data.forEach((item) => {
        newData[item.product_id] = {
          product_name: item.product_name,
          stock: item.quantity_in_stock
        }
      })
      setInventory(newData);
      setIsPending((prevState) => ({
        ...prevState,
        inventory: false
      }));
      setError((prevState) => ({
        ...prevState,
        inventory: null
      }));
    })
    .catch((err) => {
      alert("Error occured while fetching products. Check the console.");
      setIsPending((prevState) => ({
        ...prevState,
        inventory: false
      }));
      setError((prevState) => ({
        ...prevState,
        inventory: err.message
      }));
    });
  }, [currentBranch_id])

  // useEffects for checkout 
  useEffect(() => updateSubTotal,[cart])

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/shopping_cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id, branch_id: currentBranch_id })
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
    })
  }, [currentBranch_id])

  useEffect(() => {
    const newTax = parseFloat(((subTotal + shipping) * 0.0825).toFixed(2));
    setTax(newTax);
    setTotal(parseFloat((subTotal + shipping + newTax).toFixed(2)))
  }, [subTotal])

  const convertDataToCart = (data) => {
    data.map((item) => {
      addToCart(item.product_id, item.product_quantity, item.price, false);
    })
  }

  const convertNumberToPrice = (num) => {
    const price = num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return price;
  }

  //cart[productid].quantity (OR .price)
  const addToCart = (product_id, quantity, price, sendPOST) => {
    let currentCart = cart;
    let currentSCForm = shoppingCartForm;

    currentSCForm = {
      ...currentSCForm,
      user_id: user.user_id,
      branch_id: currentBranch_id,
      product_id: product_id,
      quantity: quantity,
      isNew: true
    }

    if(!currentCart[product_id]){
      currentCart[product_id] = { quantity, price };
      currentSCForm = {
        ...currentSCForm,
        isNew: true
      }
    } else {
      currentCart[product_id].quantity += quantity;
      currentSCForm = {
        ...currentSCForm,
        isNew: false
      }
    }

    console.log(currentCart)
    setShipping(4.99);
    setCart(currentCart);
    setShoppingCartForm(currentSCForm);
    updateSubTotal();

    if(sendPOST){
      fetch(`${SERVER_BASE_URL}/shopping_cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSCForm)
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
      })
    }
  }

  const updateSubTotal = () => {
    let newTotal = 0
    for(const product_id in cart)
      newTotal += cart[product_id].price * cart[product_id].quantity;
    
    console.log(newTotal)
    setSubTotal(parseFloat(newTotal.toFixed(2)));
  }

  const handleCheckout = () => {
    window.location.href = "/#/checkout"
  }

  if (isPending.products || isPending.branches || isPending.inventory) {
    return <div>Loading...</div>;
  }

  if (error.products || error.branches || error.inventory) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.productsContainer}>
            <h2>List of Products</h2>

            <div className={styles.selectBranches}>
              <label htmlFor="branch_name">Select Branch:</label>
              <select 
                name="branch_name" 
                id="branch_name"
                onChange={(event) => {
                  setCurrentBranch_id(event.target.value);
                }}
              >
                {branches.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_id}>{branch.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <ul>
                {products.map((prod) => (
                  <li key={prod.id} className={styles.productItem}>
                    <img className={styles.productItemImg} src={prod.image || "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"} alt="branch image" />
                    {inventory[prod.id].stock === 0 && (
                      <>
                        <div className={styles.alert} >
                          <img 
                            src="https://media.istockphoto.com/id/1152189152/vector/red-alert-icon.jpg?s=612x612&w=0&k=20&c=Kw_-i314F4cxgn2hmakp-88-O45FSx62c6r-OzKYMw4="
                            alt="Alert"
                          />
                          <text>Out of stock</text>
                        </div>
                      </>
                    )}
                    <h3>{prod.name}</h3>
                    <p><strong>Description: </strong>{prod.description}</p>
                    <p><strong>Price: </strong>${prod.price}</p>
                    {inventory[prod.id].stock !== 0 && 
                      <>
                        <button 
                        className={styles.button}
                        onClick={() => {
                          addToCart(prod.id, parseInt(document.getElementById(`Qty_${prod.id}`).value), prod.price, true)
                        }}
                        disabled={inventory[prod.id].stock === 0}
                      >Add to cart</button>
                      <label htmlFor={`Qty_${prod.id}`}>Qty:</label>
                      <select name={`Qty_${prod.id}`} id={`Qty_${prod.id}`}>
                        {Array.from({ length: Math.min(inventory[prod.id].stock, 20) }).map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.checkout}>
          <h2>Summary</h2>
          <div>
            <div className={styles.checkoutBlock}>
            <text>Sub Total: </text>
            <text className={styles.cost}>{convertNumberToPrice(subTotal)}</text>
            </div>
            <div className={styles.checkoutBlock}> 
              <text>Shipping: </text>
              <text className={styles.cost}>{convertNumberToPrice(shipping)}</text>
            </div>
            <div className={styles.checkoutBlock}>
              <text>Tax:  </text>
              <text className={styles.cost}>{convertNumberToPrice(tax)}</text>
            </div>
            <div className={styles.divider} />
            <div className={styles.checkoutBlock}>
              <h3>Total: </h3>
              <text className={styles.cost}>{convertNumberToPrice(total)}</text>
            </div>
            <button
            onClick={handleCheckout}
            >Checkout</button>
          </div>
        </div>
      </div>
    </>
  );  
};

export default Products;
