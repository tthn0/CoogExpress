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
    <div className={styles.container}>
      <span className={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <input
        className={styles.input}
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
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
