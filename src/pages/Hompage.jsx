import Hero from "../components/Hero";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.scss";

function Hompage() {
  return (
    <div className={styles["container"]}>
      <PageNav />
      <Hero />
    </div>
  );
}

export default Hompage;
