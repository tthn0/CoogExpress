import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.scss";

export default function Input({
  containerClassName,
  className,
  type,
  list,
  name,
  label,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  step,
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
        list={list}
        name={name}
        placeholder=" " // Required for floating label effect
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        min={min}
        max={max}
        step={step}
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

const VALIDATORS = Object.freeze({
  USERNAME: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-z0-9]{2,30}$/.source,
    title: "Must be lowercase, alphanumeric, and between 2-30 characters.",
  },
  EMAIL: {
    minLength: 6,
    maxLength: 60,
    pattern: null, // Handeled by HTML5
    title: "Must be a valid email address and between 6-60 characters.",
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 60,
    pattern: null,
    title:
      "Must be between 6-60 characters. No other special requirements for now.",
  },
  NAME: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-Z]{2,30}$/.source,
    title: "Must be alphabetic and between 2-30 characters.",
  },
  PHONE: {
    minLength: 10,
    maxLength: 10,
    pattern: /^\d{10}$/.source,
    title: "Must be a 10-digit number.",
  },
  PHONE_COUNTRY_CODE: {
    minLength: 1,
    maxLength: 3,
    pattern: /^[0-9]{1,3}$/.source,
    title: "Must be numeric and between 1-3 characters.",
  },
  ADDRESS_LINE_1: {
    minLength: 5,
    maxLength: 60,
    pattern: null,
    title: "Must be between 5-60 characters.",
  },
  ADDRESS_LINE_2: {
    minLength: 0,
    maxLength: 60,
    pattern: null,
    title: "Must be between 0-60 characters.",
  },
  CITY: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-Z ]{2,30}$/.source,
    title: "Must be alphabetic and between 2-30 characters.",
  },
  STATE: {
    minLength: 2,
    maxLength: 2,
    pattern: /^[A-Z]{2}$/.source,
    title: "Must be uppercase alphabetic and exactly 2 characters.",
  },
  ZIP: {
    minLength: 5,
    maxLength: 5,
    pattern: /^\d{5}$/.source,
    title: "Must be a 5-digit number.",
  },
  POSITIVE_INT: {
    min: 0,
    max: 1000,
    pattern: null,
    // title: "Must be a positive number.", // Title doesn't show up for type="number"
  },
});

export { VALIDATORS };
