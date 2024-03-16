import styles from "./Authentication.module.scss";
import AuthenticationLeft from "./AuthenticationLeft";
import AuthenticationRight from "./AuthenticationRight";

export default function AuthenticationPage(props) {
  document.body.style.backgroundColor = "rgb(8, 20, 26)";
  return (
    <div id={styles.container}>
      <AuthenticationLeft />
      <AuthenticationRight {...props} />
    </div>
  );
}
