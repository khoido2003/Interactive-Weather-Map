import PageNav from "../components/PageNav";
import SupportContent from "../components/SupportContent";
import SupportProvider from "../contexts/SupportContext";

import styles from "./Support.module.scss";

function Support() {
  return (
    <div className={styles["container"]}>
      <PageNav />

      <div className={styles["contentContainer"]}>
        <h1 className={styles["title"]}>Welcome! How can we help?</h1>
        <p className={styles["text"]}>
          Hi there, stuck somewhere? Don't worry we're here to help. Check out
          these most common questions we received from our users.
        </p>
        <img src="/supports/support.png" alt="Support image" />
        <SupportProvider>
          <SupportContent />
        </SupportProvider>
      </div>
    </div>
  );
}

export default Support;
