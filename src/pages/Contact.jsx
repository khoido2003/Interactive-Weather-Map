import styles from "./Contact.module.scss";

import PageNav from "../components/PageNav";
import FormSupport from "../components/FormSupport";
import SocialMedia from "../components/SocialMedia";

function Contact() {
  return (
    <div className={styles["container"]}>
      <PageNav />
      <div className={styles["contactContainer"]}>
        <FormSupport />
        <SocialMedia />
      </div>
    </div>
  );
}

export default Contact;
