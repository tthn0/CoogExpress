import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.scss";

export default function Input({
  type,
  name,
  label,
  minLength,
  maxLength,
  pattern,
  title,
  icon,
}) {
  return (
    <div id={styles.container}>
      <span id={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <input
        id={styles.input}
        type={type}
        name={name}
        placeholder=" " // Required for floating label effect
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        autoComplete="off"
        required
      />
      <label id={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
