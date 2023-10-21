import FormLogin from "../components/FormLogin";
import PageNav from "../components/PageNav";

import styles from "./Login.module.scss";
function Login() {
  return (
    <div className={styles["container"]}>
      <PageNav />
      <FormLogin />
    </div>
  );
}

export default Login;
