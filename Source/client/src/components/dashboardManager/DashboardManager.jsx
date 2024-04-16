import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../shared/NavBar";
import styles from "./DashboardManager.module.scss";
import peopleImage from "./images/People.svg";
import analyticsImage from "./images/Analytics.svg";

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
        <h1 id={styles.heading}>Select Option</h1>
        <div id={styles.options}>
          <div
            className={styles.option}
            onClick={() => navigate("/dashboard/manager/employees")}
          >
            <div className={styles.imageContainer}>
              <img src={peopleImage} alt="Graphic" />
            </div>
            <h2 className={styles.subHeading}>Manage Employees</h2>
          </div>
          <div className={styles.option}>
            <div
              className={styles.imageContainer}
              onClick={() => navigate("/dashboard/manager/reports")}
            >
              <img src={analyticsImage} alt="Graphic" />
            </div>
            <h2 className={styles.subHeading}>View Reports</h2>
          </div>
        </div>
      </div>
    </>
  );
}
