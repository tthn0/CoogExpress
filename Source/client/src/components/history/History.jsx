import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./History.module.scss";

// import NavBar from "./NavBar";

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

export default function History() {
  useEffect(() => {
    document.body.style.backgroundColor = "#08141a";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const data = [
    {
      cityState: "Houston, TX",
      zipCode: 77084,
      gallonsRequested: 4000,
      profitMargin: 37.4,
      unitRate: 2.49,
      requestDate: "March 12, 2024",
      requestTime: "10:32 PM",
      purchaseDate: "",
      purchaseTime: "-",
      status: "Pending",
    },
    {
      cityState: "Austin, TX",
      zipCode: 78704,
      gallonsRequested: 5300,
      profitMargin: 35.4,
      unitRate: 2.39,
      requestDate: "March 13, 2024",
      requestTime: "11:32 PM",
      purchaseDate: "",
      purchaseTime: "-",
      status: "Cancelled",
    },
    {
      cityState: "Dallas, TX",
      zipCode: 75201,
      gallonsRequested: 6750,
      profitMargin: 33.4,
      unitRate: 2.29,
      requestDate: "March 14, 2024",
      requestTime: "12:32 PM",
      purchaseDate: "March 16, 2024",
      purchaseTime: "1:57 PM",
      status: "Fulfilled",
    },
    {
      cityState: "San Antonio, TX",
      zipCode: 78205,
      gallonsRequested: 7200,
      profitMargin: 31.4,
      unitRate: 2.19,
      requestDate: "March 15, 2024",
      requestTime: "1:32 pm",
      purchaseDate: "",
      purchaseTime: "-",
      status: "Cancelled",
    },
    {
      cityState: "El Paso, TX",
      zipCode: 79901,
      gallonsRequested: 8100,
      profitMargin: 29.4,
      unitRate: 2.09,
      requestDate: "March 16, 2024",
      requestTime: "2:32 PM",
      purchaseDate: "",
      purchaseTime: "-",
      status: "Cancelled",
    },
    {
      cityState: "Fort Worth, TX",
      zipCode: 76102,
      gallonsRequested: 9000,
      profitMargin: 27.4,
      unitRate: 1.99,
      requestDate: "March 17, 2024",
      requestTime: "3:32 PM",
      purchaseDate: "March 17, 2024",
      purchaseTime: "4:46 PM",
      status: "Fulfilled",
    },
  ];

  return (
    <>
      {/* <NavBar /> */}
      <main id={styles.container}>
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
                  <th>Location</th>
                  <th>Gallons Requested</th>
                  <th>Profit Margin</th>
                  <th>Unit Rate</th>
                  <th>Request Date</th>
                  <th>Purchase Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <Row key={i} {...row} />
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
