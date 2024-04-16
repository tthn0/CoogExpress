import { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./Profile.module.scss";

import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

export default function Profile() {
  const { user, updateUser, deleteUser, logout } = useContext(AuthContext);
  const [customer, setCustomer] = useState({ ...user });
  const [billingInfo, setBillingInfo] = useState([]);

  useEffect(() => {
    getBillingInfo();
  }, []);

  const getBillingInfo = async () => {
    const response = await fetch(
      `${SERVER_BASE_URL}/billing?customer_id=${user.customer_id}`
    );
    const data = await response.json();
    setBillingInfo(data);
  };

  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  const LOADING_GIF =
    "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952rizjbc1hk0uplk3hul6nqz27qjx3nw77mefga29e&ep=v1_gifs_search&rid=200w.gif&ct=g";
  const IMGUR_CLIENT_ID = process.env.REACT_APP_IMGUR_CLIENT_ID;

  const handleProfilePictureChange = async (event) => {
    if (!event.target?.files[0]) return;

    setCustomer((prevState) => ({
      ...prevState,
      profile_picture: LOADING_GIF,
    }));

    const formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    const response = await fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` },
      body: formdata,
    });
    const data = await response.json();

    setCustomer((prevState) => ({
      ...prevState,
      profile_picture: data.data.link,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(customer);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) deleteUser();
  };

  const customerColumns = [
    "first_name",
    "last_name",
    "username",
    "email",
    "password_hash",
    "phone_number",
    "phone_country_code",
    "line1",
    "line2",
    "city",
    "state",
    "zip",
  ];

  const employeeColumns = [...customerColumns, "shirt_size", "gender"];

  const addCreditCard = async (e) => {
    e.preventDefault();

    console.log(e.target.card_number.value);
    console.log(e.target.cvc.value);
    console.log(e.target.expiration_month.value);
    console.log(e.target.expiration_year.value);
    console.log(e.target.cardholder_name.value);
    console.log(e.target.line1.value);
    console.log(e.target.line2.value);
    console.log(e.target.city.value);
    console.log(e.target.state.value);
    console.log(e.target.zip.value);

    const {
      card_number,
      cvc,
      expiration_month,
      expiration_year,
      cardholder_name,
      line1,
      line2,
      city,
      state,
      zip,
    } = e.target;

    fetch(`${SERVER_BASE_URL}/billing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line1: line1.value,
        line2: line2.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
        customer_id: user.customer_id,
        card_number: card_number.value,
        cvc: cvc.value,
        expiration_month: expiration_month.value,
        expiration_year: expiration_year.value,
        cardholder_name: cardholder_name.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errno) {
          alert(`Error: ${data.message}. Check the console for more details.`);
          console.error(data);
        } else {
          getBillingInfo();
          alert("Credit card added successfully!");
        }
      });
  };

  const deleteCreditCard = (id) => async () => {
    fetch(`${SERVER_BASE_URL}/billing`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errno) {
          alert(`Error: ${data.message}. Check the console for more details.`);
          console.error(data);
        } else {
          getBillingInfo();
          alert("Credit card deleted successfully!");
        }
      });
  };

  const setPreferredCard = (billing) => {
    return () => {
      console.log(
        JSON.stringify({
          ...billing,
          preferred: true,
        })
      );
      fetch(`${SERVER_BASE_URL}/billing`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...billing,
          preferred: true,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errno) {
            alert(
              `Error: ${data.message}. Check the console for more details.`
            );
            console.error(data);
          } else {
            getBillingInfo();
            alert("Preferred card set successfully!");
          }
        });
    };
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {user.role && (
          <div className={styles.innerContainer}>
            <h1 className={styles.h1}>Employee Information</h1>
            <br />
            <h3 className={styles.h3}>Employee ID</h3>
            <pre>{user.employee_id}</pre>
            <br />
            <h3 className={styles.h3}>Role</h3>
            <pre>{user.role}</pre>
            <br />
            <h3 className={styles.h3}>Supervisor</h3>
            <pre>
              {user.supervisor_first_name} {user.supervisor_last_name}
            </pre>
          </div>
        )}
        <div className={styles.innerContainer}>
          <h1 className={styles.h1}>Profile Management</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.profilePictureContainer}>
              <div
                className={styles.profilePicture}
                style={{
                  backgroundImage: customer.profile_picture
                    ? `url(${customer.profile_picture})`
                    : `url(${DEFAULT_PROFILE_PICTURE})`,
                }}
              ></div>
              <label className={styles.inputFileContainer}>
                <input
                  type="file"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
                <span className={styles.inputFileButton}>Add Image</span>
              </label>
            </div>
            <div className={styles.flexRow}>
              {Object.entries(customer)
                .filter(([key]) => {
                  return user.role
                    ? employeeColumns.includes(key)
                    : customerColumns.includes(key);
                })
                .map(([key, value]) => (
                  <div
                    key={key}
                    className={`${styles.formGroup} ${styles.flexCol}`}
                  >
                    <label className={styles.formLabel}>
                      {key.replace(/_/g, " ").toUpperCase()}
                    </label>
                    <input
                      className={styles.formInput}
                      type="text"
                      name={key}
                      value={value}
                      onChange={(e) => {
                        setCustomer((prevState) => ({
                          ...prevState,
                          [key]: e.target.value,
                        }));
                      }}
                    />
                  </div>
                ))}
            </div>
            <button type="submit" className={styles.formButton}>
              Save Changes
            </button>
          </form>

          {!user.role && (
            <>
              <button
                className={styles.formButton}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <br />
            </>
          )}

          <button className={styles.formButton} onClick={logout}>
            Logout
          </button>
        </div>

        {!user.role && (
          <div className={styles.innerContainer}>
            <h1 className={styles.h1}>Credit Card Management</h1>
            {billingInfo.map((billing, i) => {
              console.log(billing.cardholder_name, billing.preferred);
              return (
                <div key={i}>
                  <h3 className={styles.h3}>Credit Card</h3>
                  <pre>**** **** **** {billing.card_number.slice(12, 16)}</pre>
                  <pre>
                    Expires: {billing.expiration_month}/
                    {billing.expiration_year}
                  </pre>
                  {billing.preferred && <pre>Preferred Card</pre>}
                  {!billing.preferred && (
                    <button
                      className={styles.formButton}
                      onClick={setPreferredCard(billing)}
                    >
                      Set Preferred
                    </button>
                  )}
                  <button
                    className={styles.formButton}
                    onClick={deleteCreditCard(billing.id)}
                  >
                    Delete Credit Card
                  </button>
                </div>
              );
            })}
            <form onSubmit={addCreditCard}>
              <input
                className={styles.formInput}
                placeholder="Card Number"
                name="card_number"
                minLength={16}
                maxLength={16}
              />
              <input
                className={styles.formInput}
                placeholder="CVC"
                name="cvc"
                minLength={3}
                maxLength={4}
              />
              <input
                className={styles.formInput}
                placeholder="Expiration Month"
                name="expiration_month"
                minLength={1}
                maxLength={2}
              />
              <input
                className={styles.formInput}
                placeholder="Expiration Year"
                name="expiration_year"
                minLength={4}
                maxLength={4}
              />
              <input
                className={styles.formInput}
                placeholder="Cardholder Name"
                name="cardholder_name"
              />
              <input
                className={styles.formInput}
                name="line1"
                placeholder="Address Line 1"
              />
              <input
                className={styles.formInput}
                name="line2"
                placeholder="Address Line 2"
              />
              <input
                className={styles.formInput}
                name="city"
                placeholder="City"
              />
              <input
                className={styles.formInput}
                name="state"
                placeholder="State"
              />
              <input
                className={styles.formInput}
                name="zip"
                placeholder="Zip Code"
              />
              <button className={styles.formButton}>Add Credit Card</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
