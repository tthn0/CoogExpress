import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../shared/NavBar";
import styles from "./DashboardManager.module.scss";
import analyticsImage from "./images/Analytics.svg";
import factoryImage from "./images/Factory.svg";
import peopleImage from "./images/People.svg";

export default function DashboardManager() {
  useEffect(() => {
    document.body.style.backgroundColor = "#F5F5F5";
    return () => (document.body.style.backgroundColor = "");
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div id={styles.container}>
        <h1 id={styles.heading}>Manager Dashboard</h1>
        <div id={styles.options}>
          <div
            className={styles.option}
            onClick={() => navigate("/dashboard/manager/inventory")}
          >
            <div className={styles.imageContainer}>
              <img src={factoryImage} alt="Graphic" />
            </div>
            <h2 className={styles.subHeading}>Restock Inventory</h2>
          </div>
          <div
            className={styles.option}
            onClick={() => navigate("/dashboard/manager/employees")}
          >
            <div className={styles.imageContainer}>
              <img src={peopleImage} alt="Graphic" />
            </div>
            <h2 className={styles.subHeading}>Manage Employees</h2>
          </div>
          <div
            className={styles.option}
            onClick={() => navigate("/dashboard/manager/reports")}
          >
            <div className={styles.imageContainer}>
              <img src={analyticsImage} alt="Graphic" />
            </div>
            <h2 className={styles.subHeading}>View Reports</h2>
          </div>
        </div>
      </div>
    </>
  );
}
