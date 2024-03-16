import graph from "./images/graph.svg";
import styles from "./History.module.scss";

export default function History() {
  return (
    <section id={styles.container}>
      <span id={styles.bubble}>History</span>
      <h1 id={styles.heading}>Consistently offering the best rates</h1>
      <p id={styles.text}>
        Since we first started operating in 2024, we've been dedicated to
        upholding our commitment to offering the lowest rates, setting the
        standard for affordability and value in the industry.
      </p>
      <div id={styles.graphContainer}>
        <img id={styles.graph} src={graph} alt="Graph" />
      </div>
    </section>
  );
}
