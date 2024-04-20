import { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import styles from "./Report.module.scss";
import emptyImage from "./images/Empty.svg";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const PRODUCT_CATEGORY = Object.freeze({
  PACKAGING_SUPPLIES: "Packaging Supplies",
  MAILING_SUPPLIES: "Mailing Supplies",
  OFFICE_SUPPLIES: "Office Supplies",
  WRITING_INSTURMENTS: "Writing Instruments",
});

const SORT_CRITERIA = Object.freeze({
  NAME: "name",
  SKU: "sku",
  UPC: "upc",
  AMOUNT_BOUGHT: "amount_bought",
  TOTAL: "total",
  TIMESTAMP: "timestamp",
});

const ORDER_CRITERIA = Object.freeze({
  ASCENDING: "ascending",
  DESCENDING: "descending",
});

const SEARCHABLE_CLASS_NAME = "searchable";

function Row({ name, sku, upc, amount_bought, total, timestamp }) {
  const date = moment(timestamp).format("MMMM Do, YYYY");
  const time = moment(timestamp).format("h:mm A");

  styles.row = {
    ...styles.row,
    cursor: "default",
  };

  return (
    <tr className={styles.row}>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>{name}</pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>{sku}</pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>{upc}</pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {amount_bought}
        </pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>${total}</pre>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>{date}</div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>{time}</div>
      </td>
    </tr>
  );
}

export default function RouteReport() {
  const { user } = useContext(AuthContext);
  const [receipts, setReceipts] = useState([]);
  const [sortedReceipts, setSortedReceipts] = useState([]);
  const [genereated, setGenerated] = useState(false);

  const [category, setCategory] = useState(null);
  const [sortCriteria, setCriteria] = useState(null);
  const [orderCriteria, setOrderCriteria] = useState(null);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const updateDateRange = (newDate) => {
    setDateRange(newDate);
  };

  const handleGenerateReport = () => {
    if (
      !dateRange.startDate ||
      !dateRange.endDate ||
      !category ||
      !sortCriteria ||
      !orderCriteria
    ) {
      alert("Please make sure all parameters have been selected.");
      return;
    }
    setGenerated(true);

    fetch(`${SERVER_BASE_URL}/receipt?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setReceipts(data);
        return data;
      })
      .then((receipts) => {
        console.log(sortCriteria);
        console.log(receipts[0]);
        const sortedReceipts = [...receipts].sort((a, b) => {
          if (sortCriteria === SORT_CRITERIA.TIMESTAMP)
            return orderCriteria === ORDER_CRITERIA.ASCENDING
              ? new Date(a.timestamp) - new Date(b.timestamp)
              : new Date(b.timestamp) - new Date(a.timestamp);
          else if (
            sortCriteria === SORT_CRITERIA.AMOUNT_BOUGHT ||
            sortCriteria === SORT_CRITERIA.TOTAL
          )
            return orderCriteria === ORDER_CRITERIA.ASCENDING
              ? a[sortCriteria] - b[sortCriteria]
              : b[sortCriteria] - a[sortCriteria];
          else
            return orderCriteria === ORDER_CRITERIA.ASCENDING
              ? a[sortCriteria].localeCompare(b[sortCriteria])
              : b[sortCriteria].localeCompare(a[sortCriteria]);
        });
        setSortedReceipts(sortedReceipts);
      });
  };

  const totalTransactions = receipts.length;
  const averagePricePerTransaction =
    receipts.reduce((acc, receipt) => acc + parseFloat(receipt.total), 0) /
    totalTransactions;
  const numberOfProductsSold = receipts.reduce(
    (acc, receipt) => acc + receipt.amount_bought,
    0
  );
  const totalRevenue = receipts.reduce(
    (acc, receipt) => acc + parseFloat(receipt.total),
    0
  );
  const netProfit = totalRevenue * 0.25;
  const numberOfUniqueCustomers = new Set(
    receipts.map((receipt) => receipt.customer_id)
  ).size;

  let productsBoughtHistogram = {}; // Products bought -> Number of transactions
  let productsBoughtHistogramLabels = [];

  receipts.forEach((r) => {
    if (productsBoughtHistogram[r.amount_bought]) {
      productsBoughtHistogram[r.amount_bought]++;
    } else {
      productsBoughtHistogram[r.amount_bought] = 1;
      productsBoughtHistogramLabels.push(r.amount_bought);
    }
  });

  const histogramData = {
    labels: productsBoughtHistogramLabels.sort(),
    datasets: [
      {
        label: "Transaction frequencies by product count",
        data: productsBoughtHistogramLabels
          .sort()
          .map((amountBought) => productsBoughtHistogram[amountBought]),
        backgroundColor: "rgba(54, 162, 235, 0.33)", // Blue
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        borderWidth: 1,
      },
    ],
  };

  const productCounts = {};

  for (const receipt of receipts) {
    if (productCounts[receipt.name]) {
      productCounts[receipt.name]++;
    } else {
      productCounts[receipt.name] = 1;
    }
  }

  const donutData = {
    labels: Object.keys(productCounts),
    datasets: [
      {
        label: "Packages by Type",
        data: Object.values(productCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.33)", // Red
          "rgba(75, 192, 192, 0.33)", // Green
          "rgba(54, 162, 235, 0.33)", // Blue
          "rgba(153, 102, 255, 0.33)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(75, 192, 192, 1)", // Green
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(153, 102, 255, 1)", // Purple
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

  const dates = receipts.map((pkg) => new Date(pkg.timestamp));
  const binnedDates = binDates(dates);

  const lineData = {
    labels: Object.keys(binnedDates),
    datasets: [
      {
        label: "Routes by Date",
        data: Object.values(binnedDates),
        backgroundColor: "rgba(153, 102, 255, 0.33)", // Purple
        borderColor: "rgba(153, 102, 255, 1)", // Purple
        borderWidth: 1,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div id={styles.container}>
      <h1 id={styles.heading}>Product Report</h1>
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
          <h2 className={styles.subHeading}>Product Category</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Product Category
            </option>
            <option value={PRODUCT_CATEGORY.PACKAGING_SUPPLIES}>
              Packaging Supplies
            </option>
            <option value={PRODUCT_CATEGORY.MAILING_SUPPLIES}>
              Mailing Supplies
            </option>
            <option value={PRODUCT_CATEGORY.OFFICE_SUPPLIES}>
              Office Supplies
            </option>
            <option value={PRODUCT_CATEGORY.WRITING_INSTURMENTS}>
              Writing Instruments
            </option>
          </select>
        </div>

        <div>
          <h2 className={styles.subHeading}>Sorting Criteria</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setCriteria(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Sorting Criteria
            </option>
            <option value={SORT_CRITERIA.NAME}>Product</option>
            <option value={SORT_CRITERIA.SKU}>SKU</option>
            <option value={SORT_CRITERIA.UPC}>UPC</option>
            <option value={SORT_CRITERIA.AMOUNT_BOUGHT}>Amount Sold</option>
            <option value={SORT_CRITERIA.TOTAL}>Transaction Total</option>
            <option value={SORT_CRITERIA.TIMESTAMP}>Timestamp</option>
          </select>
        </div>

        <div>
          <h2 className={styles.subHeading}>Order</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setOrderCriteria(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Order
            </option>
            <option value={ORDER_CRITERIA.ASCENDING}>Ascending</option>
            <option value={ORDER_CRITERIA.DESCENDING}>Descending</option>
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
            <h3 className={styles.h3}>Total Transactions</h3>
            <pre>{totalTransactions}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Price Per Transaction</h3>
            <pre>${averagePricePerTransaction.toFixed(2)}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Number of Products Sold</h3>
            <pre>{numberOfProductsSold}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Revenue</h3>
            <pre>${totalRevenue.toFixed(2)}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Net Profit</h3>
            <pre>${netProfit.toFixed(2)}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Number of Unique Customers</h3>
            <pre>{numberOfUniqueCustomers}</pre>
          </div>
        </div>

        <div id={styles.chartContainer}>
          <div className={styles.chart}>
            <p>Products Per Transaction Histogram</p>
            <Bar data={histogramData} />
          </div>
          <div className={styles.chart}>
            <p>Product Distribution</p>
            <Doughnut data={donutData} />
          </div>
          <div className={styles.chart} id={styles.lineChart}>
            <p>Transactions Over Time</p>
            <Line
              data={lineData}
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
        id={styles.outerTableContainer}
        className={styles.section}
        style={{
          display: genereated ? "block" : "none",
        }}
      >
        {sortedReceipts.length === 0 ? (
          <div id={styles.noResults}>
            <img id={styles.empty} src={emptyImage} alt="Clipboard" />
            <p>No results found</p>
          </div>
        ) : (
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>UPC</th>
                  <th>Amount Sold</th>
                  <th>Transaction Total</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {sortedReceipts.map((props, i) => (
                  <Row key={i} {...props} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
