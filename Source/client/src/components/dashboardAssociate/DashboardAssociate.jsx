import { useState } from "react";
import NavBar from "../shared/NavBar";
import PackageForm from "./PackageForm";
import RouteForm from "./RouteForm";
import styles from "./DashboardAssociate.module.scss";

const FORM_TYPES = Object.freeze({
  PACKAGE: "package",
  ROUTE: "route",
});

export default function DashboardAssociate() {
  const [formType, setFormType] = useState(FORM_TYPES.PACKAGE);

  return (
    <>
      <NavBar />
      <div id={styles.container}>
        <main id={styles.innerContainer}>
          <section>
            <button
              className={styles.option}
              onClick={() => setFormType(FORM_TYPES.PACKAGE)}
            >
              New Package
            </button>
            <button
              className={styles.option}
              onClick={() => setFormType(FORM_TYPES.ROUTE)}
            >
              New Route
            </button>
          </section>
          {
            {
              [FORM_TYPES.PACKAGE]: <PackageForm />,
              [FORM_TYPES.ROUTE]: <RouteForm />,
            }[formType]
          }
        </main>
      </div>
    </>
  );
}
