import { NavLink } from "react-router-dom";
import styles from "./Hero.module.scss";

// Components
import Tabs from "./Tabs";
import TabContent from "./TabContent";

// Tabscontext
import { TabsProvider } from "../contexts/TabsContext";

function Hero() {
  return (
    <TabsProvider>
      <div className={styles["hero"]}>
        <h1 className={styles["hero__title"]}>Meet SkyCrafters</h1>
        <span className={styles["hero__tabs"]}>
          <Tabs />
        </span>
      </div>

      <TabContent />

      <NavLink to="/login" className={styles["btn--start"]}>
        Explore the Weather Map <span>&rarr;</span>
      </NavLink>
    </TabsProvider>
  );
}

export default Hero;
