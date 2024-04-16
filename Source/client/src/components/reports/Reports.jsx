import { useState } from "react";
import styles from "./Reports.module.scss";
import NavBar from "../shared/NavBar";
import PackageReport from "./PackageReport";
import RouteReport from "./RouteReport";
import ProductReport from "./ProductReport";

const REPORT_TYPES = Object.freeze({
  PACKAGE: "package",
  ROUTE: "route",
  PRODUCT: "product",
});

export default function Reports() {
  const [formType, setFormType] = useState(REPORT_TYPES.PACKAGE);

  return (
    <>
      <NavBar />
      <div id={styles.container}>
        <main id={styles.innerContainer}>
          <section>
            <button
              className={styles.option}
              onClick={() => setFormType(REPORT_TYPES.PACKAGE)}
            >
              Package Report
            </button>
            <button
              className={styles.option}
              onClick={() => setFormType(REPORT_TYPES.ROUTE)}
            >
              Route Report
            </button>
            <button
              className={styles.option}
              onClick={() => setFormType(REPORT_TYPES.PRODUCT)}
            >
              Product Report
            </button>
          </section>
          {
            {
              [REPORT_TYPES.PACKAGE]: <PackageReport />,
              [REPORT_TYPES.ROUTE]: <RouteReport />,
              [REPORT_TYPES.PRODUCT]: <ProductReport />,
            }[formType]
          }
        </main>
      </div>
    </>
  );
}
