import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { user, updateUser, deleteUser, logout } = useContext(AuthContext);
  const [customer, setCustomer] = useState({ ...user });

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

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {user.role && (
          <div className={styles.innerContainer}>
            <h1>Employee Information</h1>
            <h3>Employee ID</h3>
            <p>{user.employee_id}</p>
            <h3>Role</h3>
            <p>{user.role}</p>
            <h3>Supervisor</h3>
            <p>
              {user.supervisor_first_name} {user.supervisor_last_name}
            </p>
          </div>
        )}
        <div className={styles.innerContainer}>
          <h1>Profile Management</h1>
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

          {/* Only if the user is a customer: */}

          {/* <h2>Card Information</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.flexRow}>
            <div className={`${styles.formGroup} ${styles.flexCol}`}>
              <label className={styles.formLabel}>CARD NUMBER</label>
              <input
                className={styles.formInput}
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.flexCol}`}>
              <label className={styles.formLabel}>EXPIRATION DATE</label>
              <input
                className={styles.formInput}
                type="text"
                name="expirationDate"
                value={cardInfo.expirationDate}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.flexCol}`}>
              <label className={styles.formLabel}>CVV</label>
              <input
                className={styles.formInput}
                type="text"
                name="cvv"
                value={cardInfo.cvv}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.flexCol}`}>
              <label className={styles.formLabel}>NAME ON CARD</label>
              <input
                className={styles.formInput}
                type="text"
                name="nameOnCard"
                value={cardInfo.nameOnCard}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className={styles.formButton}>
            Update Card Info
          </button>
        </form> */}
        </div>
      </div>
    </>
  );
}
