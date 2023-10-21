import { NavLink } from "react-router-dom";
import styles from "./logo.module.scss";

function Logo() {
  return (
    <>
      <span className={styles["logo"]}>
        <NavLink to="/">⚡ WeatherWave &reg;</NavLink>
      </span>

      <span className={styles["logo--small-screen"]}>
        <NavLink to="/">⚡ </NavLink>
      </span>
    </>
  );
}

export default Logo;
