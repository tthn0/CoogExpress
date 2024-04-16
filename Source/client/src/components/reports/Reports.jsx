import { useState } from "react";

import styles from "./Report.module.scss";

import NavBar from "../shared/NavBar";
import PackageReport from "./PackageReport";

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

            <hr />

            <button
              className={styles.option}
              onClick={() => setFormType(REPORT_TYPES.ROUTE)}
            >
              Route Report
            </button>

            <hr />

            <button
              className={styles.option}
              onClick={() => setFormType(REPORT_TYPES.PRODUCT)}
            >
              Product Report
            </button>

            <hr />
          </section>
          {
            {
              [REPORT_TYPES.PACKAGE]: <PackageReport />,
              [REPORT_TYPES.ROUTE]: <></>,
              [REPORT_TYPES.PRODUCT]: <></>,
            }[formType]
          }
        </main>
      </div>
    </>
  );
}
