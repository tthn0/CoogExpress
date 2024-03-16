import Bento from "./Bento";
import styles from "./Boxes.module.scss";

export default function Boxes() {
  return (
    <section id={styles.container}>
      <Bento
        heading="Learn more"
        description="To see how we can help your business or to learn more about our climate sustainability goals, read our blog articles below."
        primaryButtonText="Read Our Blog"
        primaryButtonLink="#"
        background="linear-gradient(90deg, #2e4e60, #11071f)"
      />
      <Bento
        heading="Ready to get started?"
        description="Sign up for a free account to start shipping packages today. Or contact our sales team to learn about enterprise solutions."
        primaryButtonText="Register"
        primaryButtonLink="/register"
        secondaryButtonText="Contact Sales"
        secondaryButtonLink="#"
        background="linear-gradient(90deg, #5d3c63, #13040f)"
      />
    </section>
  );
}
