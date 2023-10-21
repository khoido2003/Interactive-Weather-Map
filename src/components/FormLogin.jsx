import { useEffect, useState } from "react";
import styles from "./FormLogin.module.scss"; // Import your styles module
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/FakeAuthentication";

function FormLogin() {
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("12345");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated === true) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <form className={styles.container} onSubmit={handleLogin}>
      {" "}
      {/* Use styles object to apply class name */}
      <div className={styles.left}>
        <div className={styles.header}>
          <h2 className={`${styles.animation} ${styles.a1}`}>Welcome Back</h2>
          <h4 className={`${styles.animation} ${styles.a2}`}>
            Log in to your account using email and password
          </h4>
        </div>
        <div className={styles.form}>
          <input
            type="email"
            className={`${styles["form-field"]} ${styles.animation} ${styles.a3}`}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            className={`${styles["form-field"]} ${styles.animation} ${styles.a4}`}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className={`${styles.animation} ${styles.a5}`}>
            <a href="#">Forgot Password</a>
          </p>
          <button type="submit" className={`${styles.animation} ${styles.a6}`}>
            LOGIN
          </button>
        </div>
      </div>
      <div className={styles.right}></div>
    </form>
  );
}

export default FormLogin;
