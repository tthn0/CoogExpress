import { useContext, useEffect, useState } from "react";

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

import NavBar from "../shared/NavBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PackageReport() {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [timePeriod, setTimePeriod] = useState(-1);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/package?source_branch_id=${user.branch_id}`)
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

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

  function binDates(dates) {
    const dateCounts = {};
    dates.forEach((date) => {
      const dateString = date.toISOString().split("T")[0];
      dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
    });
    return dateCounts;
  }

  const dates = packages.map((pkg) => new Date(pkg.initiated_at));
  const binnedDates = binDates(dates);

  const packageOrderData = {
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

  return (
    <>
      <h1>Report</h1>
      <p>Total Packages: {packageCount}</p>
      <p>Delivered Packages: {deliveredCount}</p>
      <p>Lost Packages: {lostCount}</p>
      <p>Delivery Success Rate: {deliverySuccessRate.toFixed(1)}%</p>
      <p>Total Revenue: ${totalRevenueFromPackages.toFixed(2)}</p>
      <p>Average Package Cost: ${averagePackageCost.toFixed(2)}</p>
      <div id={styles.donutContainer}>
        <div>
          <p>Package Speed Statistics</p>
          <Doughnut data={speedData} />
        </div>
        <div>
          <p>Package Type Statistics</p>
          <Doughnut data={typeData} />
        </div>
        <div>
          <p>Package Orders</p>
          <Line
            data={packageOrderData}
            options={{
              scales: {
                y: { suggestedMin: 0 },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
