import styles from "./Quote.module.scss";

export default function Quote() {
  return (
    <section id={styles.container}>
      <blockquote id={styles.quote}>
        "Cougar Express has been our <span id={styles.blue}>go-to</span> courier
        for years now. Their rates are <span id={styles.pink}>unbeatable</span>,
        and their customer service is second to none."
      </blockquote>
      <p id={styles.author}>Renu Khator, President of UH</p>
    </section>
  );
}
