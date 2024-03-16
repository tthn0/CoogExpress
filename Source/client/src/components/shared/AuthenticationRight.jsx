import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthenticationRight.module.scss";
import Input from "./Input";

export default function AuthenticationRight({
  heading,
  description,
  handleSubmit, // A curry function that takes in a `useNavigate` function and returns a function that takes in the event object.
  inputPropArray,
  promptFragment,
  buttonText,
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
          <form id={styles.form} onSubmit={handleSubmit(useNavigate())}>
            {inputPropArray.map((inputProp, index) => (
              <Input key={index} {...inputProp} />
            ))}
            <p id={styles.prompt}>{promptFragment}</p>
            <button id={styles.submit} type="submit">
              {buttonText}
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
