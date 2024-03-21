// export default function DashboardCustomer() {
//   const { user, logout } = useContext(AuthContext);
//   useEffect(() => {
//     document.body.style.backgroundColor = "#05020d";
//     return () => (document.body.style.backgroundColor = "");
//   }, []);

//   return (
//     <>
//       <h1>Shitty Dashboard</h1>
//       <p>Welcome back, {user.first_name}.</p>
//       <button onClick={logout}>Logout</button>
//       <h3>User Info</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Key</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(user).map(([key, value]) => (
//             <tr key={key}>
//               <td>{key}</td>
//               <td>{value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./DashboardCustomer.module.scss";
import AuthContext from "../../contexts/AuthContext";

function Row({
  cityState,
  zipCode,
  gallonsRequested,
  profitMargin,
  unitRate,
  requestDate,
  requestTime,
  purchaseDate,
  purchaseTime,
  status,
}) {
  return (
    <tr>
      <td>
        <div className={`${styles.searchable} ${styles.first}`}>
          {cityState}
        </div>
        <div className={`${styles.searchable} ${styles.last}`}>{zipCode}</div>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {gallonsRequested}
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {profitMargin}%
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          ${unitRate}/gal
        </pre>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {requestDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {requestTime}
        </div>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {purchaseDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {purchaseTime}
        </div>
      </td>
      <td>
        <span
          className={`${styles.searchable} ${styles.status} ${
            styles[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

function Row2({
  recipientFirstName,
  recipientLastName,
  recipientProfilePicture,
  status,
  totalCost,
  type,
  width,
  length,
  height,
  weight,
  line1,
  line2,
  city,
  state,
  zip,
  deliveredDate,
  deliveredTime,
}) {
  return (
    <tr>
      <td>
        <div class={styles.userContainer}>
          <div class={styles.imageContainer}>
            <img src={recipientProfilePicture} alt="Profile" />
          </div>
          <div class={styles.nameContainer}>
            <div class={`${styles.searchable} ${styles.first}`}>
              {recipientFirstName}
            </div>
            <div class={`${styles.searchable} ${styles.last}`}>
              {recipientLastName}
            </div>
          </div>
        </div>
      </td>
      <td>
        {/* <span
        className={`${styles.searchable} ${styles.status} ${
          styles[status.toLowerCase()]
        }`}
      >
        {status}
      </span> */}
        <span
          className={`${styles.searchable} ${styles.status}
        ${styles.pending}`}
        >
          {status}
        </span>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>${totalCost}</pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {type === "Mail" ? "📧 Mail" : "📦 Parcel"}
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {width}×{length}×{height} cm
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>{weight} g</pre>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.first}`}>{line1}</div>
        <div className={`${styles.searchable} ${styles.first}`}>{line2}</div>
        <div className={`${styles.searchable} ${styles.last}`}>
          {city}, {state} {zip}
        </div>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.first}`}>
          {deliveredDate}
        </div>
        <div className={`${styles.searchable} ${styles.last}`}>
          {deliveredTime}
        </div>
      </td>
    </tr>
  );
}

export default function History() {
  const { user, logout } = useContext(AuthContext);
  useEffect(() => {
    document.body.style.backgroundColor = "#08141a";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  const packages = [
    {
      recipientFirstName: "Uma",
      recipientLastName: "Ramurthy",
      recipientProfilePicture:
        "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
      status: "Delivered",
      totalCost: 19.99,
      type: "Parcel",
      width: 32,
      length: 45,
      height: 12,
      weight: 19,
      line1: "123 Sesame St",
      line2: "Suite 9000",
      city: "Houston",
      state: "TX",
      zip: 77084,
      deliveredDate: "March 16, 2024",
      deliveredTime: "4:46 PM",
    },
    {
      recipientFirstName: "Johnathan",
      recipientLastName: "Rincon",
      recipientProfilePicture:
        "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
      status: "Pending",
      totalCost: 1.99,
      type: "Mail",
      width: 8,
      length: 10,
      height: 0,
      weight: 2,
      line1: "1 Apple Circle",
      line2: null,
      city: "San Francisco",
      state: "CA",
      zip: 55934,
      deliveredDate: "February 12, 2024",
      deliveredTime: "11:32 AM",
    },
  ];

  return (
    <>
      {/* <NavBar /> */}
      <main id={styles.container}>
        <p>Welcome back, {user.first_name}.</p>
        <button onClick={logout}>Logout</button>
        <section id={styles.controls} className={styles.section}>
          <p id={styles.searchText} className={styles.label}>
            What are you searching for?
          </p>
          <p id={styles.sortText} className={styles.label}>
            Sort By
          </p>
          <p id={styles.orderText} className={styles.label}>
            Order
          </p>
          <div id={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} id={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by any field FIXME"
              autocomplete="off"
              tabindex="1"
            />
          </div>
          <div id={styles.columnContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select id={styles.sortColumn} tabindex="2">
              <option value="">1 FIXME</option>
              <option value="">2 FIXME</option>
              <option value="">3 FIXME</option>
              <option value="">4 FIXME</option>
              <option value="">5 FIXME</option>
              <option selected value="">
                6 FIXME
              </option>
            </select>
          </div>
          <div id={styles.orderContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select id={styles.sortOrder} tabindex="3">
              <option value="0">Descending FIXME</option>
              <option value="1">Ascending FIXME</option>
            </select>
          </div>
          <button id={styles.export} tabindex="4">
            Export JSON FIXME
          </button>
        </section>
        <section id={styles.outerTableContainer} className={styles.section}>
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Status</th>
                  <th>Total Cost</th>
                  <th>Type</th>
                  <th>Measurements</th>
                  <th>Weight</th>
                  <th>Destination</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((props, i) => (
                  <Row2 key={i} {...props} />
                ))}
                {packages.map((props, i) => (
                  <Row2 key={i} {...props} />
                ))}
                {packages.map((props, i) => (
                  <Row2 key={i} {...props} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id={styles.pagination} className={styles.section}>
          <p id={styles.records}>Loading... FIXME</p>
          <div id={styles.recordSize}>
            <p>Showing FIXME</p>
            <div id={styles.recordsDropdownContainer}>
              <FontAwesomeIcon icon={faCaretDown} id={styles.caretDownIcon} />
              <select id={styles.logsLimit}>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
