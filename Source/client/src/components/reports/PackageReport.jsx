import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faSearch,
  faChevronDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import styles from "./Report.module.scss";
import emptyImage from "./images/Empty.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PACKAGE_ORIGIN = Object.freeze({
  INTERNAL: "internal",
  EXTERNAL: "external",
});

const SORT_COLUMNS = Object.freeze({
  SENDER: "sender",
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
  packageId,
  sender_first_name,
  sender_last_name,
  sender_profile_picture,
  receiver_first_name,
  receiver_last_name,
  receiver_profile_picture,
  status,
  costString,
  type,
  speed,
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
  const navigate = useNavigate();

  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

  const handleClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      const isHashRouter = window.location.hash;

      if (isHashRouter) {
        window.open(`/#/package/${packageId}`, "_blank");
      } else {
        window.open(`/package/${packageId}`, "_blank");
      }
    } else {
      navigate(`/package/${packageId}`);
    }
  };

  return (
    <tr className={styles.row} onClick={handleClick}>
      <td>
        <div className={styles.userContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.profilePicture}
              src={sender_profile_picture ?? DEFAULT_PROFILE_PICTURE}
              alt="Profile"
            />
          </div>
          <div className={styles.nameContainer}>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
              {sender_first_name}
            </div>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
              {sender_last_name}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className={styles.userContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.profilePicture}
              src={receiver_profile_picture ?? DEFAULT_PROFILE_PICTURE}
              alt="Profile"
            />
          </div>
          <div className={styles.nameContainer}>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
              {receiver_first_name}
            </div>
            <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
              {receiver_last_name}
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
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {speed === "Standard"
            ? "🐌 Standard"
            : speed === "Express"
            ? "🐢 Express"
            : "🐇 Overnight"}
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

export default function PackageReport() {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [packageOrigin, setPackageOrigin] = useState(null);
  const [genereated, setGenerated] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(SORT_COLUMNS.INITIATED);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.DESCENDING);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

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

  const updateDateRange = (newDate) => {
    setDateRange(newDate);
  };

  const packageCount = packages.length;

  const deliveredCount = packages.reduce((count, pkg) => {
    return count + (pkg.status === "Delivered" ? 1 : 0);
  }, 0);
  const lostCount = packages.reduce((count, pkg) => {
    return count + (pkg.status === "Lost" ? 1 : 0);
  }, 0);
  const deliverySuccessRate =
    (deliveredCount / (deliveredCount + lostCount)) * 100;

  const totalRevenueFromPackages = packages.reduce((total, pkg) => {
    return (
      total +
      parseFloat(pkg.base_shipping_cost) +
      parseFloat(pkg.additional_fees)
    );
  }, 0);

  const averagePackageCost = totalRevenueFromPackages / packageCount;

  const [standardCount, expressCount, overnightCount] = [
    "Standard",
    "Express",
    "Overnight",
  ].map((speed) => {
    return packages.reduce((count, pkg) => {
      return count + (pkg.speed === speed ? 1 : 0);
    }, 0);
  });

  const [mailCount, parcelCount] = ["Mail", "Parcel"].map((type) => {
    return packages.reduce((count, pkg) => {
      return count + (pkg.type === type ? 1 : 0);
    }, 0);
  });

  const speedData = {
    labels: [
      `🐌 Standard: ${standardCount}`,
      `🐢 Express: ${expressCount}`,
      `🐇 Overnight: ${overnightCount}`,
    ],
    datasets: [
      {
        label: "Packages by Speed",
        data: [standardCount, expressCount, overnightCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.33)", // Red
          "rgba(54, 162, 235, 0.33)", // Blue
          "rgba(75, 192, 192, 0.33)", // Green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(75, 192, 192, 1)", // Green
        ],
        borderWidth: 1,
      },
    ],
  };

  const typeData = {
    labels: [`📧 Mail: ${mailCount}`, `📦 Parcel: ${parcelCount}`],
    datasets: [
      {
        label: "Packages by Type",
        data: [mailCount, parcelCount],
        backgroundColor: [
          "rgba(153, 102, 255, 0.33)", // Purple
          "rgba(255, 159, 64, 0.33)", // Orange
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
        ],
        borderWidth: 1,
      },
    ],
  };

  const binDates = (dates) => {
    const dateCounts = {};
    dates.forEach((date) => {
      const dateString = date.toISOString().split("T")[0];
      dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
    });
    return dateCounts;
  };

  const dates = packages.map((pkg) => new Date(pkg.initiated_at));
  const binnedDates = binDates(dates);

  const packageData = {
    labels: Object.keys(binnedDates),
    datasets: [
      {
        label: "Packages by Date",
        data: Object.values(binnedDates),
        backgroundColor: "rgba(255, 99, 132, 0.33)", // Red
        borderColor: "rgba(255, 99, 132, 1)", // Red
        borderWidth: 1,
        lineTension: 0.5,
      },
    ],
  };

  const handleGenerateReport = () => {
    if (!dateRange.startDate || !dateRange.endDate || !packageOrigin) {
      alert("Please select a time period and package origin.");
      return;
    }
    setGenerated(true);

    const url =
      packageOrigin === PACKAGE_ORIGIN.INTERNAL
        ? `${SERVER_BASE_URL}/package?source_branch_id=${user.branch_id}`
        : `${SERVER_BASE_URL}/package_gone_thru?branch_id=${user.branch_id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data.filter((pkg) => {
          return (
            new Date(pkg.initiated_at) >= new Date(dateRange.startDate) &&
            new Date(pkg.initiated_at) <= new Date(dateRange.endDate)
          );
        });
      })
      .then((data) => {
        setPackages(data);
      });
  };

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
        : "";
      const timeDelivered = delivered
        ? formatDateAndTime(delivered).formattedTime
        : "-";

      return {
        packageId: p.package_id,
        sender_first_name: p.sender_first_name,
        sender_last_name: p.sender_last_name,
        sender_profile_picture: p.sender_profile_picture,
        receiver_first_name: p.receiver_first_name,
        receiver_last_name: p.receiver_last_name,
        receiver_profile_picture: p.receiver_profile_picture,
        status: p.status,
        costFloat,
        costString,
        type: p.type,
        speed: p.speed,
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
      if (column === SORT_COLUMNS.SENDER) {
        // If first names are the same, compare last names
        const firstNameComparison = a.sender_first_name.localeCompare(
          b.sender_first_name
        );
        const lastNameComparison = a.sender_last_name.localeCompare(
          b.sender_last_name
        );
        return firstNameComparison !== 0
          ? ascending
            ? firstNameComparison
            : -firstNameComparison
          : ascending
          ? lastNameComparison
          : -lastNameComparison;
      } else if (column === SORT_COLUMNS.RECIPIENT) {
        // If first names are the same, compare last names
        const firstNameComparison = a.receiver_first_name.localeCompare(
          b.receiver_first_name
        );
        const lastNameComparison = a.receiver_last_name.localeCompare(
          b.receiver_last_name
        );
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
      const sort = ascending ? a[column] > b[column] : a[column] < b[column]; // Returns a boolean
      return sort ? 1 : -1; // Sort needs a signed integer to determine order
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
    <div id={styles.container}>
      <h1 id={styles.heading}>Package Report</h1>
      <p className={styles.paragraph}>
        Statistics of the packages meeting the specified criteria will be
        displayed below.
      </p>

      <section
        style={{
          display: !genereated ? "block" : "none",
        }}
      >
        <div>
          <h2 className={styles.subHeading}>Time Period</h2>
          <div
            style={{
              width: "min(25em, 100%)",
            }}
          >
            <Datepicker
              primaryColor={"blue"}
              value={dateRange}
              onChange={updateDateRange}
              showShortcuts={true}
              popoverDirection="down"
            />
          </div>
        </div>
        <div>
          <h2 className={styles.subHeading}>Package Origin</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setPackageOrigin(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Package Origin
            </option>
            <option value={PACKAGE_ORIGIN.INTERNAL}>Internally Sourced</option>
            <option value={PACKAGE_ORIGIN.EXTERNAL}>Externally Sourced</option>
          </select>
        </div>
        <div>
          <h2 className={styles.subHeading}>Generate Report</h2>
          <div id={styles.generateReport} onClick={handleGenerateReport}>
            <span>
              <FontAwesomeIcon icon={faClipboardList} />
              Generate
            </span>
          </div>
        </div>
      </section>

      <section
        style={{
          display: genereated ? "block" : "none",
        }}
      >
        <h2 className={styles.subHeading}>Summary</h2>

        <div className={styles.stats}>
          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Packages</h3>
            <pre>{packageCount}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Delivered Packages</h3>
            <pre>{deliveredCount}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Lost Packages</h3>
            <pre>{lostCount}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Delivery Success Rate</h3>
            <pre>{deliverySuccessRate.toFixed(1)}%</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Revenue</h3>
            <pre>${totalRevenueFromPackages.toFixed(2)}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Package Cost</h3>
            <pre>${averagePackageCost.toFixed(2)}</pre>
          </div>
        </div>

        <div id={styles.chartContainer}>
          <div className={styles.chart}>
            <p>Package Speed Statistics</p>
            <Doughnut data={speedData} />
          </div>
          <div className={styles.chart}>
            <p>Package Type Statistics</p>
            <Doughnut data={typeData} />
          </div>
          <div className={styles.chart} id={styles.lineChart}>
            <p>Package Orders</p>
            <Line
              data={packageData}
              options={{
                scales: {
                  y: { suggestedMin: 0 },
                },
              }}
            />
          </div>
        </div>
      </section>
      <section
        id={styles.packageContainer}
        style={{
          display: genereated ? "block" : "none",
        }}
      >
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
              <option value={SORT_COLUMNS.SENDER}>Sender</option>
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
          {parsedFilteredSortedPackages.length === 0 ? (
            <div id={styles.noResults}>
              <img id={styles.empty} src={emptyImage} alt="Clipboard" />
              <p>No results found</p>
            </div>
          ) : (
            <div id={styles.innerTableContainer}>
              <table id={styles.table}>
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Status</th>
                    <th>Total Cost</th>
                    <th>Type</th>
                    <th>Speed</th>
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
          )}
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
      </section>
    </div>
  );
}
