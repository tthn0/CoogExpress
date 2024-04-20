import { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faClipboardList } from "@fortawesome/free-solid-svg-icons";
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

const SORT_CRITERIA = Object.freeze({
  ROUTE_ID: "route_id",
  START_TIMESTAMP: "start_timestamp",
  END_TIMESTAMP: "end_timestamp",
  PACKAGE_COUNT: "package_count",
  LOST_COUNT: "lost_count",
  ESTIMATED_FUEL: "estimated_fuel",
  ESTIMATED_DISTANCE: "estimated_distance",
});

const ORDER_CRITERIA = Object.freeze({
  ASCENDING: "ascending",
  DESCENDING: "descending",
});

const SEARCHABLE_CLASS_NAME = "searchable";

const Card = ({ picture, primary, secondary }) => {
  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

  return (
    <div className={styles.userCard}>
      <div className={styles.userContainer}>
        <div>
          <img
            className={styles.driverPicture}
            src={picture || DEFAULT_PROFILE_PICTURE}
            alt="User"
          />
        </div>
        <div className={styles.text}>
          <h1>{primary}</h1>
          <p>{secondary}</p>
        </div>
      </div>
    </div>
  );
};

function Row({
  route_id,
  start_timestamp,
  end_timestamp,
  package_count,
  estimated_fuel,
  estimated_distance,
  lost_count,
}) {
  const startDate = moment(start_timestamp).format("MMMM Do, YYYY");
  const startTime = moment(start_timestamp).format("h:mm A");
  const endDate = moment(end_timestamp).format("MMMM Do, YYYY");
  const endTime = moment(end_timestamp).format("h:mm A");

  styles.row = {
    ...styles.row,
    cursor: "default",
  };

  return (
    <tr className={styles.row}>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {route_id}
        </pre>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {startDate}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
          {startTime}
        </div>
      </td>
      <td>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.first}`}>
          {endDate}
        </div>
        <div className={`${SEARCHABLE_CLASS_NAME} ${styles.last}`}>
          {endTime}
        </div>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {package_count}
        </pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {lost_count}
        </pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {estimated_fuel}
        </pre>
      </td>
      <td>
        <pre className={`${SEARCHABLE_CLASS_NAME} ${styles.pre}`}>
          {estimated_distance}
        </pre>
      </td>
    </tr>
  );
}

export default function RouteReport() {
  const { user } = useContext(AuthContext);
  const [routes, setRoutes] = useState([]);
  const [sortedRoutes, setSortedRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [genereated, setGenerated] = useState(false);

  const [driver, setDriver] = useState({});
  const [branch, setBranch] = useState({});
  const [driverId, setDriverId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [sortCriteria, setCriteria] = useState(null);
  const [orderCriteria, setOrderCriteria] = useState(null);

  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/branch`)
      .then((res) => res.json())
      .then((data) => setBranches(data));
    fetch(`${SERVER_BASE_URL}/employee?branch_id=${user.branch_id}&role=Driver`)
      .then((res) => res.json())
      .then((data) => setDrivers(data));
  }, []);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const updateDateRange = (newDate) => {
    setDateRange(newDate);
  };

  const handleGenerateReport = ({ showCharts }) => {
    return () => {
      if (
        !dateRange.startDate ||
        !dateRange.endDate ||
        !driverId ||
        !branchId ||
        !sortCriteria ||
        !orderCriteria
      ) {
        alert("Please make sure all parameters have been selected.");
        return;
      }

      setGenerated(true);
      setShowCharts(showCharts);

      fetch(`${SERVER_BASE_URL}/employee?employee_id=${driverId}`)
        .then((res) => res.json())
        .then((data) => setDriver(data[0]));
      fetch(`${SERVER_BASE_URL}/branch?branch_id=${branchId}`)
        .then((res) => res.json())
        .then((data) => setBranch(data[0]));

      fetch(
        `${SERVER_BASE_URL}/route?driver_employee_id=${driverId}&destination_branch_id=${branchId}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data.filter((route) => {
            return (
              route.end_timestamp &&
              new Date(route.start_timestamp) >=
                new Date(dateRange.startDate) &&
              new Date(route.end_timestamp) <= new Date(dateRange.endDate)
            );
          });
        })
        .then((data) => {
          setRoutes(data);
          return data;
        })
        .then((routes) => {
          const sortedRoutes = [...routes].sort((a, b) => {
            if (sortCriteria === SORT_CRITERIA.START_TIMESTAMP)
              return orderCriteria === ORDER_CRITERIA.ASCENDING
                ? new Date(a.start_timestamp) - new Date(b.start_timestamp)
                : new Date(b.start_timestamp) - new Date(a.start_timestamp);
            else if (sortCriteria === SORT_CRITERIA.END_TIMESTAMP)
              return orderCriteria === ORDER_CRITERIA.ASCENDING
                ? new Date(a.end_timestamp) - new Date(b.end_timestamp)
                : new Date(b.end_timestamp) - new Date(a.end_timestamp);
            else
              return orderCriteria === ORDER_CRITERIA.ASCENDING
                ? a[sortCriteria] - b[sortCriteria]
                : b[sortCriteria] - a[sortCriteria];
          });
          setSortedRoutes(sortedRoutes);
        });
    };
  };

  const routeType =
    parseInt(branchId) === user.branch_id ? "Direct" : "Transfer";
  const routeCount = routes.length;
  const averageRouteTime =
    routes.reduce((acc, route) => {
      return (
        acc + (new Date(route.end_timestamp) - new Date(route.start_timestamp))
      );
    }, 0) / routeCount;
  const averagePackagesPerRoute =
    routes.reduce((acc, route) => acc + route.package_count, 0) / routeCount;
  const totalFuel = routes.reduce(
    (acc, route) => acc + parseFloat(route.estimated_fuel),
    0
  );
  const averageFuelPerRoute = totalFuel / routeCount;
  const totalRouteDistance = routes.reduce(
    (acc, route) => acc + route.estimated_distance,
    0
  );
  const averageRouteDistance = totalRouteDistance / routeCount;
  const fuelEconomy = totalRouteDistance / totalFuel;
  const totalPackagesLost = routes.reduce(
    (acc, route) => acc + route.lost_count,
    0
  );
  const totalPackagesDelivered =
    routes.reduce((acc, route) => acc + route.package_count, 0) -
    totalPackagesLost;
  const percentagePackagesLost =
    (totalPackagesLost / totalPackagesDelivered) * 100;

  const binDates = (dates) => {
    const dateCounts = {};
    dates.forEach((date) => {
      const dateString = date.toISOString().split("T")[0];
      dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
    });
    return dateCounts;
  };

  const dates = routes.map((pkg) => new Date(pkg.start_timestamp));
  const binnedDates = binDates(dates);

  const routeData = {
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

  let packagesOnRouteHistogramData = {}; // Package count -> Number of routes
  let packagesOnRouteHistogramLabels = [];

  routes.forEach((route) => {
    if (packagesOnRouteHistogramData[route.package_count]) {
      packagesOnRouteHistogramData[route.package_count]++;
    } else {
      packagesOnRouteHistogramData[route.package_count] = 1;
      packagesOnRouteHistogramLabels.push(route.package_count);
    }
  });

  const histogramData = {
    labels: packagesOnRouteHistogramLabels.sort(),
    datasets: [
      {
        label: "Route frequencies by package count",
        data: packagesOnRouteHistogramLabels
          .sort()
          .map((packageCount) => packagesOnRouteHistogramData[packageCount]),
        backgroundColor: "rgba(54, 162, 235, 0.33)", // Blue
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        borderWidth: 1,
      },
    ],
  };

  const donutData = {
    labels: [
      `❌ Lost: ${totalPackagesLost}`,
      `✅ Delivered: ${totalPackagesDelivered}`,
    ],
    datasets: [
      {
        label: "Packages by Type",
        data: [totalPackagesLost, totalPackagesDelivered],
        backgroundColor: [
          "rgba(255, 99, 132, 0.33)", // Red
          "rgba(75, 192, 192, 0.33)", // Green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(75, 192, 192, 1)", // Green
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id={styles.container}>
      <h1 id={styles.heading}>Route Report</h1>
      <p className={styles.paragraph}>
        Statistics of the routes meeting the specified criteria will be
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
              marginTop: "0.5em",
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
          <h2 className={styles.subHeading}>Driver</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setDriverId(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Driver
            </option>
            {drivers.map((driver) => (
              <option key={driver.employee_id} value={driver.employee_id}>
                {driver.first_name} {driver.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className={styles.subHeading}>Destination</h2>
          <select
            className={styles.reportSelect}
            onChange={(e) => setBranchId(e.target.value)}
          >
            <option value={null} selected disabled>
              Select Destination
            </option>
            {branches.map((branch) => (
              <option key={branch.branch_id} value={branch.branch_id}>
                {branch.name}
              </option>
            ))}
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
            <option value={SORT_CRITERIA.START_TIMESTAMP}>
              Start Timestamp
            </option>
            <option value={SORT_CRITERIA.END_TIMESTAMP}>End Timestamp</option>
            <option value={SORT_CRITERIA.PACKAGE_COUNT}>Package Count</option>
            <option value={SORT_CRITERIA.LOST_COUNT}>Lost Count</option>
            <option value={SORT_CRITERIA.ESTIMATED_FUEL}>Estimated Fuel</option>
            <option value={SORT_CRITERIA.ESTIMATED_DISTANCE}>
              Estimated Distance
            </option>
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
          <div className={styles.generateReportButtonContainer}>
            <div
              id={styles.generateReport}
              onClick={handleGenerateReport({ showCharts: true })}
            >
              <span>
                <FontAwesomeIcon icon={faChartPie} />
                With Charts
              </span>
            </div>
            <div
              id={styles.generateReport}
              onClick={handleGenerateReport({ showCharts: false })}
            >
              <span>
                <FontAwesomeIcon icon={faClipboardList} />
                No Charts
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: genereated ? "block" : "none",
        }}
      >
        <h2 className={styles.subHeading}>Summary</h2>

        <div className={styles.cardContainer}>
          <Card
            picture={driver.profile_picture}
            primary={`${driver.first_name} ${driver.last_name}`}
            secondary={`Employee #${driver.employee_id}`}
          />
          <Card
            picture={branch.image}
            primary={branch.name}
            secondary={`Branch #${branch.branch_id}`}
          />
        </div>

        <div className={styles.stats}>
          <div className={styles.cell}>
            <h3 className={styles.h3}>Route Type</h3>
            <pre>{routeType}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Number of Routes</h3>
            <pre>{routeCount}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Route Time</h3>
            <pre>{moment(averageRouteTime).format("HH[h] mm[m]")}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Packages Per Route</h3>
            <pre>{averagePackagesPerRoute.toFixed(1)}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Fuel</h3>
            <pre>{totalFuel.toFixed(1)} gal</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Fuel Per Route</h3>
            <pre>{averageFuelPerRoute.toFixed(1)} gal</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Route Distance</h3>
            <pre>{totalRouteDistance} mi</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Average Route Distance</h3>
            <pre>{averageRouteDistance.toFixed(1)} mi</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Fuel Economy</h3>
            <pre>{fuelEconomy.toFixed(1)} mpg</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Packages Lost</h3>
            <pre>{totalPackagesLost}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Total Packages Delivered</h3>
            <pre>{totalPackagesDelivered}</pre>
          </div>

          <div className={styles.cell}>
            <h3 className={styles.h3}>Percentage of Packages Lost</h3>
            <pre>{percentagePackagesLost.toFixed(1)}%</pre>
          </div>
        </div>

        <div
          id={styles.chartContainer}
          style={{
            display: showCharts ? "grid" : "none",
          }}
        >
          <div className={styles.chart}>
            <p>Package Histogram</p>
            <Bar data={histogramData} />
          </div>
          <div className={styles.chart}>
            <p>Lost vs Delivered</p>
            <Doughnut data={donutData} />
          </div>
          <div className={styles.chart} id={styles.lineChart}>
            <p>Routes Started</p>
            <Line
              data={routeData}
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
        {sortedRoutes.length === 0 ? (
          <div id={styles.noResults}>
            <img id={styles.empty} src={emptyImage} alt="Clipboard" />
            <p>No results found</p>
          </div>
        ) : (
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>Route ID</th>
                  <th>Start Timestamp</th>
                  <th>End Timestamp</th>
                  <th>Package Count</th>
                  <th>Lost Count</th>
                  <th>Estimated Fuel</th>
                  <th>Estimated Distance</th>
                </tr>
              </thead>
              <tbody>
                {sortedRoutes.map((props, i) => (
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
