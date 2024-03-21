import { useEffect } from "react";

import Boxes from "./Boxes";
import Footer from "./Footer";
import Hero from "./Hero";
import History from "./History";
import styles from "./Home.module.scss";
import Nav from "./Nav";
import Quote from "./Quote";
import Stats from "./Stats";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "#05020d";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  return (
    <div id={styles.outerContainer}>
      <div id={styles.innerContainer}>
        <Nav />
        <main id={styles.main}>
          <Hero />
          <Stats />
          <History />
          <Quote />
          <Boxes />
        </main>
        <Footer
          categories={{
            product: ["Infrastructure", "Previews", "Analytics", "Enterprise"],
            explore: ["Pricing", "Partners", "Audits", "Resources"],
            company: ["About", "Careers", "Blog", "Legal"],
          }}
          repoLink="https://github.com/tthn0/CoogExpress"
        />
      </div>
    </div>
  );
}
