import { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import PackageForm from "./PackageForm";
import RouteForm from "./RouteForm";
import styles from "./DashboardAssociate.module.scss";

export default function DashboardAssociate() {
  const [formType, setFormType] = useState("package");

  useEffect(() => {
    document.body.style.background = "#f0f0f0";
    return () => (document.body.style.background = "");
  }, []);

  return (
    <>
      <NavBar />
      <div id={styles.outerContainer}>
        <div id={styles.optionContainer}>
          <button
            className={styles.option}
            onClick={() => setFormType("package")}
          >
            New Package
          </button>
          <button
            className={styles.option}
            onClick={() => setFormType("route")}
          >
            New Route
          </button>
        </div>
        {
          {
            package: <PackageForm />,
            route: <RouteForm />,
          }[formType]
        }
      </div>
    </>
  );
}
