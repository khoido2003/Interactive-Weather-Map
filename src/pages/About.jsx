import Carousel from "../components/Carousel";
import PageNav from "../components/PageNav";
import { CarouselsProvider } from "../contexts/CarouselsContext";

import styles from "./About.module.scss";

function About() {
  return (
    <>
      <div className={styles["container"]}>
        <PageNav />
      </div>
      <CarouselsProvider>
        <Carousel />
      </CarouselsProvider>
    </>
  );
}

export default About;
