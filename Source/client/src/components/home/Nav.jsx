import { Link } from "react-router-dom";
import logo1x from "../shared/images/logos/logo-chromatic-white@1x.svg";
import logo3x from "../shared/images/logos/logo-chromatic-white@3x.svg";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <header id={styles.container}>
      <Link to="/">
        <picture>
          <source media="(max-width: 820px)" srcSet={logo1x} />
          <img id={styles.logo} src={logo3x} alt="Logo" />
        </picture>
      </Link>
      <nav id={styles.desktopLinks}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="#" className={styles.link}>
          About
        </Link>
        <Link to="#" className={styles.link}>
          Pricing
        </Link>
        <Link to="#" className={styles.link}>
          More
        </Link>
      </nav>
      <nav id={styles.desktopButtons}>
        <Link to="/login">
          <button id={styles.loginButton}>Login</button>
        </Link>
        <Link to="/register">
          <button id={styles.registerButton}>Register</button>
        </Link>
      </nav>
    </header>
  );
}
