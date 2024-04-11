import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Package.module.scss";

import NavBar from "../shared/NavBar";

function UserCard({ picture, first, last, username, email, phone, type }) {
  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <img className={styles.picture} src={picture} alt="Profile" />
        <div className={styles.contactInfo}>
          <h1 className={styles.name}>
            {first} {last}
          </h1>
          <h2 className={styles.username}>@{username}</h2>
          <div id={styles.buttonContainer}>
            <a href={`mailto:${email}`}>
              <button id={styles.primaryButton}>Email</button>
            </a>
            <a href={`tel:${phone}`}>
              <button id={styles.secondaryButton}>Call</button>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.userType}>
        {type === "Sender" ? (
          <>
            <span>{type}</span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>{type}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Package() {
  const { packageId } = useParams();
  const [pkg, setPackage] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/package?package_id=${packageId}`)
      .then((res) => res.json())
      .then((data) => setPackage(data[0])); // Since the API returns an array
  }, [packageId]);

  useEffect(() => {
    document.body.style.background = "#EBEBEB";
    return () => (document.body.style.background = "");
  }, []);

  return (
    <>
      <NavBar />
      <main id={styles.container}>
        <section id={styles.top}>
          <UserCard
            picture={pkg.sender_profile_picture}
            first={pkg.sender_first_name}
            last={pkg.sender_last_name}
            username={pkg.sender_username}
            email={pkg.sender_email}
            phone={pkg.sender_phone_number}
            type={"Sender"}
          />
          <UserCard
            picture={pkg.receiver_profile_picture}
            first={pkg.receiver_first_name}
            last={pkg.receiver_last_name}
            username={pkg.receiver_username}
            email={pkg.receiver_email}
            phone={pkg.receiver_phone_number}
            type={"Receiver"}
          />
        </section>
        <section id={styles.middle} className={styles.box}>
          <div id={styles.header}>
            <h1 id={styles.summary}>Summary</h1>
            <p id={styles.hash}>#QU240322</p>
          </div>
          <div id={styles.divider}></div>
          <div id={styles.packageInfo}>
            <div className={styles.cell}>
              <h2>Estimated Delivery</h2>
              <p>{"Hi"}</p>
            </div>
            <div className={styles.cell}>
              <h2>Type</h2>
              <p>{pkg.type}</p>
            </div>
            <div className={styles.cell}>
              <h2>Dimensions</h2>
              <p>{`${pkg.length}×${pkg.width}×${pkg.height} cm`}</p>
            </div>
            <div className={styles.cell}>
              <h2>Weight</h2>
              <p>{pkg.weight} g</p>
            </div>
            <div className={styles.cell}>
              <h2>Destination Address</h2>
              <p>{pkg.destination_address_line1}</p>
              <p>{pkg.destination_address_line2}</p>
              <p>{`${pkg.destination_address_city}, ${pkg.destination_address_state} ${pkg.destination_address_zip}`}</p>
            </div>
            <div className={styles.cell}>
              <h2>Delivery Speed</h2>
              <p>{pkg.speed}</p>
            </div>
            <div className={styles.cell}>
              <h2>Base Shipping Cost</h2>
              <p>${pkg.base_shipping_cost}</p>
            </div>
            <div className={styles.cell}>
              <h2>Additional Fees</h2>
              <p>${pkg.additional_fees}</p>
            </div>
            <div className={styles.cell}>
              <h2>Subtotal</h2>
              <p>
                $
                {parseFloat(pkg.base_shipping_cost) +
                  parseFloat(pkg.additional_fees)}
              </p>
            </div>
            <div className={styles.cell}>
              <h2>Initiated</h2>
              <p>{new Date(pkg.initiated_at).toISOString()}</p>
            </div>
          </div>
        </section>
        <section id={styles.bottom} className={styles.box}>
          <pre>{JSON.stringify(pkg, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
