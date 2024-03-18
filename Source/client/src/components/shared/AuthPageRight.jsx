import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "./AuthPageRight.module.scss";
import Input from "./Input";
import AuthContext from "../../contexts/AuthContext";

export default function AuthPageRight({
  heading,
  description,
  handleSubmit, // A curry function that returns another function that takes in the event object.
  inputPropArray,
  promptFragment,
  buttonText,
  footerText,
  footerActionText,
  footerActionLink,
}) {
  const { attemptLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main id={styles.container}>
      <section id={styles.top}>
        <div id={styles.centered}>
          <h1 id={styles.heading}>{heading}</h1>
          <p id={styles.description}>{description}</p>
          <form
            id={styles.form}
            onSubmit={handleSubmit(attemptLogin, setIsLoading)}
          >
            {inputPropArray.map((inputProp, index) => (
              <Input key={index} {...inputProp} />
            ))}
            <p id={styles.prompt}>{promptFragment}</p>
            <button id={styles.submit} type="submit">
              {isLoading ? (
                <div id={styles.loader}></div>
              ) : (
                <span>{buttonText}</span>
              )}
            </button>
          </form>
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
