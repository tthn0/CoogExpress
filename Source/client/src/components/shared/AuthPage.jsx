import { useEffect } from "react";
import styles from "./AuthPage.module.scss";
import AuthPageLeft from "./AuthPageLeft";
import AuthPageRight from "./AuthPageRight";

export default function AuthPage(props) {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(8, 20, 26)";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  return (
    <div id={styles.container}>
      <AuthPageLeft />
      <AuthPageRight {...props} />
    </div>
  );
}
