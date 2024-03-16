import { Link } from "react-router-dom";
import logo2x from "./images/logos/logo-monochrome-white@2x.svg";
import logo3x from "./images/logos/logo-monochrome-white@3x.svg";
import world from "./images/world.png";
import styles from "./AuthenticationLeft.module.scss";

export default function AuthenticationLeft() {
  return (
    <section id={styles.container}>
      <Link to="/">
        <picture>
          <source media="(max-width: 1600px)" srcset={logo2x} />
          <img id={styles.logo} src={logo3x} alt="Logo" />
        </picture>
      </Link>
      <div id={styles.mesh}>{/* Mesh gradient wadded thru CSS */}</div>
      <div id={styles.worldContainer}>
        <img src={world} alt="" />
      </div>
    </section>
  );
}
