import styles from "./FormSupport.module.scss";

function FormSupport() {
  return (
    <form
      className={styles["form"]}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles["row"]}>
        <h1>Contact us</h1>
        <p>
          Fill up the form below and our team will revert you soon! Hope to
          connect with you
        </p>
      </div>

      <div className={styles["row"]}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" placeholder="Khoi Do" />
      </div>

      <div className={styles["row"]}>
        <label htmlFor="email">Your email</label>
        <input type="email" id="email" placeholder="xyz@.email.com" />
      </div>

      <div className={styles["row"]}>
        <label htmlFor="description">Message</label>
        <textarea
          type="textarea"
          id="description"
          placeholder="Write your response here...."
        />
      </div>

      <button>Send</button>
    </form>
  );
}

export default FormSupport;
