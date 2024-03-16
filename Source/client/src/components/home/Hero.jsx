import { Link } from "react-router-dom";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section>
      <h1 id={styles.heading}>
        <span id={styles.gradient}>Cougar Express</span> Shipments
      </h1>
      <p id={styles.text}>
        We pride ourselves on being the unrivaled frontrunner in the industry,
        offering our clients competitive shipping rates and consistently
        fulfilling deliveries on time.
      </p>
      <div id={styles.buttonContainer}>
        <Link to="/register">
          <button id={styles.primaryCta}>Register</button>
        </Link>
        <Link to="#">
          <button id={styles.secondaryCta}>Contact Sales</button>
        </Link>
      </div>
    </section>
  );
}
