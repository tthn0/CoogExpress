import { Link } from "react-router-dom";
import logo3x from "../shared/images/logos/logo-chromatic-white@3x.svg";
import styles from "./Footer.module.scss";

export default function Footer({ categories, repoLink }) {
  const capitalizeFirst = (phrase) =>
    phrase.charAt(0).toUpperCase() + phrase.slice(1);

  return (
    <footer id={styles.container}>
      <div id={styles.branding}>
        <Link to="/">
          <img id={styles.logo} src={logo3x} alt="Logo" />
        </Link>
        <p id={styles.paragraph}>
          &copy; {new Date().getFullYear()} CoogExpress LLC. Give us a star on{" "}
          <Link id={styles.github} to={repoLink} target="_blank">
            GitHub
          </Link>
          !
        </p>
      </div>
      {Object.entries(categories).map(([category, subCategories]) => (
        <div key={category}>
          <h3 className={styles.heading}>{capitalizeFirst(category)}</h3>
          <ul className={styles.list}>
            {subCategories.map((subCategory, index) => (
              <li className={styles.listItem} key={index}>
                <Link to="#" className={styles.link}>
                  {subCategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
