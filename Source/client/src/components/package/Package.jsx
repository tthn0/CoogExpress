import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import qrCode from "./images/QR.png";
import styles from "./Package.module.scss";
import NavBar from "../shared/NavBar";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const formatDateAndTime = (date) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // Abbreviated month name
    day: "numeric", // Numeric day, with no leading zeros
    year: "numeric", // Full year
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric", // Numeric hour
    minute: "2-digit", // Numeric minute
    hour12: true, // 12-hour clock format
  });
  return { formattedDate, formattedTime };
};

function UserCard({ picture, first, last, username, email, phone, type }) {
  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <img
          className={styles.picture}
          src={picture || DEFAULT_PROFILE_PICTURE}
          alt="Profile"
        />
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

function Row({ date, time, status, line1, line2, city, state, zip, index }) {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const calculateRemainingDistance = () => {
    if (status === "Delivered") return 0;
    return 15 * (index + 1) + getRandomInt(-5, 5);
  };
  return (
    <tr className={styles.row}>
      <td>
        <div className={styles.first}>{date}</div>
        <div className={styles.last}>{time}</div>
      </td>
      <td>
        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
          {status}
        </span>
      </td>
      <td>
        <div className={styles.first}>{line1}</div>
        <div className={styles.first}>{line2}</div>
        <div className={styles.last}>
          {city}, {state} {zip}
        </div>
      </td>
      <td>
        <pre className={styles.pre}>{calculateRemainingDistance()} miles</pre>
      </td>
    </tr>
  );
}

export default function Package() {
  const { packageId } = useParams();
  const [hash, setHash] = useState(null);
  const [pkg, setPackage] = useState({});
  const [trackingHistory, setTrackingHistory] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/package?package_id=${packageId}`)
      .then((res) => res.json())
      .then((data) => setPackage(data[0])); // Since the API returns an array
    fetch(`${SERVER_BASE_URL}/tracking_history?package_id=${packageId}`)
      .then((res) => res.json())
      .then((data) => setTrackingHistory(data));

    const calculateHash = async () => {
      const hash = await sha256(packageId);
      setHash(hash.slice(0, 10).toUpperCase());
    };
    calculateHash();
  }, [packageId]);

  useEffect(() => {
    document.body.style.background = "#EBEBEB";
    return () => (document.body.style.background = "");
  }, []);

  async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  const initiatedAt = new Date(pkg.initiated_at);

  const estimatedOffset = {
    Standard: 3,
    Express: 2,
    Overnight: 1,
  };

  let estimatedDelivery = initiatedAt;
  estimatedDelivery.setDate(initiatedAt.getDate() + estimatedOffset[pkg.speed]);

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
            <p id={styles.hash}>#{hash}</p>
          </div>
          <div id={styles.divider}></div>
          <div id={styles.underDivider}>
            <div id={styles.packageInfo}>
              <div id={styles.packageInfoLeft}>
                <div className={styles.cell}>
                  <h2>Estimated Delivery</h2>
                  <p>{formatDateAndTime(estimatedDelivery).formattedDate}</p>
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
              </div>
              <div id={styles.packageInfoRight}>
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
                  <p>{formatDateAndTime(initiatedAt).formattedDate}</p>
                  <p>{formatDateAndTime(initiatedAt).formattedTime}</p>
                </div>
              </div>
            </div>
            <div id={styles.qrCode}>
              <img id={styles.qrCode} src={qrCode} alt="QR Code" />
            </div>
          </div>
        </section>
        <section id={styles.outerTableContainer} className={styles.box}>
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Remaining Distance</th>
                </tr>
              </thead>
              <tbody>
                {trackingHistory.map((th, i) => {
                  return (
                    <Row
                      date={
                        formatDateAndTime(new Date(th.timestamp)).formattedDate
                      }
                      time={
                        formatDateAndTime(new Date(th.timestamp)).formattedTime
                      }
                      index={i}
                      {...th}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
