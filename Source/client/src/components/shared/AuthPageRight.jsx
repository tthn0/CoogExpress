import { Link } from "react-router-dom";
import styles from "./AuthPageRight.module.scss";
export { styles };

export default function AuthPageRight({
  heading,
  description,
  children,
  footerText,
  footerActionText,
  footerActionLink,
}) {
  return (
    <main id={styles.container}>
      <section id={styles.top}>
        <div id={styles.centered}>
          <h1 id={styles.heading}>{heading}</h1>
          <p id={styles.description}>{description}</p>
          {children}
        </div>
      </section>
      <section id={styles.bottom}>
        <p id={styles.footerText}>
          {footerText}{" "}
          <Link to={footerActionLink} id={styles.footerActionLink}>
            {footerActionText}
          </Link>
        </p>
      </section>
    </main>
  );
}
