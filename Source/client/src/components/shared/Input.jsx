import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.scss";

export default function Input({
  containerClassName,
  className,
  type,
  name,
  label,
  minLength,
  maxLength,
  pattern,
  title,
  icon,
  required = true,
}) {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <span className={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <input
        className={`${styles.input} ${className}`}
        type={type}
        name={name}
        placeholder=" " // Required for floating label effect
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        autoComplete="off"
        required={required}
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
