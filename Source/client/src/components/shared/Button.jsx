import styles from "./Button.module.scss";

export default function Button({ className, text, type, onClick, isLoading }) {
  return (
    <button
      className={`${className} ${styles.button} ${
        isLoading ? styles.disabled : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <div className={styles.loader}></div> : <span>{text}</span>}
    </button>
  );
}
