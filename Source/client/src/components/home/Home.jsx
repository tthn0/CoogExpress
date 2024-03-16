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
    document.body.style.backgroundImage = "url(background.jpg)";
    document.body.style.backgroundSize = "clamp(40em, 100%, 80em)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center 0";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  return (
    <div id={styles.container}>
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
  );
}
