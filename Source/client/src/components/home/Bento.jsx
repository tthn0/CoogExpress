import { Link } from "react-router-dom";
import styles from "./Bento.module.scss";

export default function Bento({
  heading,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink = "#",
  secondaryButtonLink = "#",
  background,
}) {
  return (
    <div
      id={styles.container}
      style={{
        background: background,
      }}
    >
      <h1 id={styles.heading}>{heading}</h1>
      <p id={styles.description}>{description}</p>
      <div id={styles.buttonContainer}>
        {primaryButtonText && (
          <Link to={primaryButtonLink} id={styles.link}>
            <button id={styles.primaryButton}>{primaryButtonText}</button>
          </Link>
        )}
        {secondaryButtonText && (
          <Link to={secondaryButtonLink} id={styles.link}>
            <button id={styles.secondaryButton}>{secondaryButtonText}</button>
          </Link>
        )}
      </div>
    </div>
  );
}
