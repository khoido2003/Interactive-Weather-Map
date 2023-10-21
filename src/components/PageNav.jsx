import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.scss";

function PageNav() {
  return (
    <nav className={styles["nav"]}>
      <Logo />

      <ul className={styles["nav__list"]}>
        <li>
          {" "}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/support">Support</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact us</NavLink>
        </li>
      </ul>

      <NavLink className={styles["login"]} to="/login">
        Login
      </NavLink>
    </nav>
  );
}

export default PageNav;
