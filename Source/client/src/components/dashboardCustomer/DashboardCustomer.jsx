import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faCaretDown,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./DashboardCustomer.module.scss";
import AuthContext from "../../contexts/AuthContext";
import NavBar from "../shared/NavBar";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const SORT_COLUMNS = Object.freeze({
  RECIPIENT: "recipient",
  STATUS: "status",
  COST: "cost",
  TYPE: "type",
  DESTINATION: "destination",
  INITIATED: "initiated",
  DELIVERED: "delivered",
});

const SORT_ORDER = Object.freeze({
  ASCENDING: "ascending",
  DESCENDING: "descending",
});

const SEARCHABLE_CLASS_NAME = "searchable";

function Row({
  first,
  last,
  picture,
  status,
  costString,
  type,
  line1,
  line2,
  city,
  state,
  zip,
  dateInitiated,
  timeInitiated,
  dateDelivered,
  timeDelivered,
}) {
  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  return (
    <tr>
      <td>
        <FontAwesomeIcon
          icon={faCircleInfo}
          className={styles.infoIcon}
          onClick={() => alert("This feature is not yet implemented.")}
        />
      </td>
      <td>
        <div className={styles.userContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.profilePicture}
              src={picture ?? DEFAULT_PROFILE_PICTURE}
              alt="Profile"
            />
          </div>
          <div className={styles.nameContainer}>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
              {first}
            </div>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
              {last}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span
          className={`${SEARCHABLE_CLASS_NAME} ${styles.status} ${
            styles[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {costString}
        </pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {type === "Mail" ? "📧 Mail" : "📦 Parcel"}
        </pre>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {line1}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {line2}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
          {city}, {state} {zip}
        </div>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {dateInitiated}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
          {timeInitiated}
        </div>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {dateDelivered}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
          {timeDelivered}
        </div>
      </td>
    </tr>
  );
}

export default function DashboardCustomer() {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(SORT_COLUMNS.INITIATED);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.DESCENDING);

  useEffect(() => {
    document.body.style.backgroundColor = "#08141a";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/package`)
      .then((response) => response.json())
      .then((data) => {
        if (user.role) {
          return data.filter((p) => p.source_branch_id === user.branch_id);
        } else {
          return data.filter((p) => p.sender_customer_id === user.customer_id);
        }
      })
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  useEffect(() => {
    const searchables = Array.from(
      document.getElementsByClassName(SEARCHABLE_CLASS_NAME)
    );
    searchables.forEach((element) => {
      // Use regular expression with the "gi" flag to match all occurrences
      // and replace them with the same text but wrapped in a span with a
      // background color. "g" means global and "i" means case insensitive.
      const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapeRegExp(searchQuery.trim()), "gi");
      const cellText = element.textContent;
      element.innerHTML = cellText.replace(
        regex,
        (match) => `<span class=${styles.highlighted}>${match}</span>`
      );
    });
  }, [searchQuery]);

  // const sqlDatetimeToDate = (sqlDatetime) => {
  //   // Regex split that creates [year, month, day, hour, minutes, seconds] array
  //   let dateTimeParts = sqlDatetime.split(/[- :]/);
  //   // Month index begins with 0 for January and ends with 11 for December, so decrement by one
  //   dateTimeParts[1]--;
  //   return new Date(...dateTimeParts);
  // };

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

  const parsePackages = (packages) => {
    return packages.map((p) => {
      const costFloat =
        parseFloat(p.base_shipping_cost) + parseFloat(p.additional_fees);
      const costString = `$${costFloat.toFixed(2)}`;

      const initiated = new Date(p.initiated_at);
      const delivered = p.delivered_at ? new Date(p.delivered_at) : null;

      const dateInitiated = formatDateAndTime(initiated).formattedDate;
      const timeInitiated = formatDateAndTime(initiated).formattedTime;

      const dateDelivered = delivered
        ? formatDateAndTime(delivered).formattedDate
        : "-";
      const timeDelivered = delivered
        ? formatDateAndTime(delivered).formattedTime
        : "-";

      return {
        first: p.receiver_first_name,
        last: p.receiver_last_name,
        picture: p.receiver_profile_picture,
        status: p.status,
        costFloat,
        costString,
        type: p.type,
        line1: p.destination_address_line1,
        line2: p.destination_address_line2,
        city: p.destination_address_city,
        state: p.destination_address_state,
        zip: p.destination_address_zip,
        initiated,
        delivered,
        dateInitiated,
        timeInitiated,
        dateDelivered,
        timeDelivered,
      };
    });
  };

  const filterPackages = (packages, searchQuery) => {
    searchQuery = searchQuery.trim().toLowerCase();
    return packages.filter((p) => {
      const searchKeys = Object.keys(p).filter((key) => key !== "picture");
      return searchKeys.some((key) => {
        const itemValue = String(p[key]).toLowerCase();
        return itemValue.includes(searchQuery);
      });
    });
  };

  const sortPackages = (packages, column, order) => {
    const ascending = order === SORT_ORDER.ASCENDING;
    return [...packages].sort((a, b) => {
      if (column === SORT_COLUMNS.RECIPIENT) {
        // If first names are the same, compare last names
        const firstNameComparison = a.first.localeCompare(b.first);
        const lastNameComparison = a.last.localeCompare(b.last);
        return firstNameComparison !== 0
          ? ascending
            ? firstNameComparison
            : -firstNameComparison
          : ascending
          ? lastNameComparison
          : -lastNameComparison;
      } else if (column === SORT_COLUMNS.DESTINATION) {
        // If line1 are the same, compare line2
        const line1Comparison = a.line1.localeCompare(b.line1);
        const line2Comparison =
          a.line2 && b.line2 && a.line2.localeCompare(b.line2);
        return line1Comparison !== 0
          ? ascending
            ? line1Comparison
            : -line1Comparison
          : ascending
          ? line2Comparison
          : -line2Comparison;
      } else if (column === SORT_COLUMNS.COST) {
        // For cost, compare the float values
        return ascending
          ? a.costFloat - b.costFloat
          : b.costFloat - a.costFloat;
      }
      // For other columns, use the default comparison
      return ascending ? a[column] > b[column] : a[column] < b[column];
    });
  };

  const parsedPackages = parsePackages(packages);
  const parsedFilteredPackages = filterPackages(parsedPackages, searchQuery);
  const parsedFilteredSortedPackages = sortPackages(
    parsedFilteredPackages,
    sortColumn,
    sortOrder
  );

  const handleExport = () => {
    const jsonString = JSON.stringify(parsedFilteredSortedPackages, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "Packages.json";

    // Add link, click it, and remove it from DOM
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <NavBar />
      <main id={styles.container}>
        <h1 id={styles.heading}>Welcome back, {user.first_name}</h1>
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
              className={styles.input}
              type="text"
              placeholder="Search by any field"
              autoComplete="off"
              tabIndex="1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div id={styles.columnContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select
              className={styles.select}
              id={styles.sortColumn}
              tabIndex="2"
              defaultValue={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
            >
              <option value={SORT_COLUMNS.RECIPIENT}>Recipient</option>
              <option value={SORT_COLUMNS.STATUS}>Status</option>
              <option value={SORT_COLUMNS.COST}>Total Cost</option>
              <option value={SORT_COLUMNS.TYPE}>Type</option>
              <option value={SORT_COLUMNS.DESTINATION}>Destination</option>
              <option value={SORT_COLUMNS.INITIATED}>Initiated</option>
              <option value={SORT_COLUMNS.DELIVERED}>Delivered</option>
            </select>
          </div>
          <div id={styles.orderContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select
              className={styles.select}
              id={styles.sortOrder}
              tabIndex="3"
              defaultValue={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value={SORT_ORDER.DESCENDING}>Descending</option>
              <option value={SORT_ORDER.ASCENDING}>Ascending</option>
            </select>
          </div>
          <button id={styles.export} tabIndex="4" onClick={handleExport}>
            Export JSON
          </button>
        </section>
        <section id={styles.outerTableContainer} className={styles.section}>
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>{/* Empty to account for info icon */}</th>
                  <th>Recipient</th>
                  <th>Status</th>
                  <th>Total Cost</th>
                  <th>Type</th>
                  <th>Destination</th>
                  <th>Initiated</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {parsedFilteredSortedPackages.map((props, i) => (
                  <Row key={i} {...props} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id={styles.pagination} className={styles.section}>
          <p id={styles.records}>
            {parsedFilteredSortedPackages.length} Records Found
          </p>
          <div id={styles.recordSize}>
            <p>Showing</p>
            <div id={styles.recordsDropdownContainer}>
              <FontAwesomeIcon icon={faCaretDown} id={styles.caretDownIcon} />
              <select
                id={styles.logsLimit}
                onChange={(e) => alert("This feature is not yet implemented.")}
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
