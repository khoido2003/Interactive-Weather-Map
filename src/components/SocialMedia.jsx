import styles from "./SocialMedia.module.scss";

function SocialMedia() {
  return (
    <div className={styles["container"]}>
      <div className={`${styles["cardSlide--front"]} ${styles["cardSlide"]}`}>
        <img src="/socialmedia/media2.jpg" alt="media" />
      </div>

      <div className={`${styles["cardSlide--back"]} ${styles["cardSlide"]}`}>
        <img src="/socialmedia/media1.png" alt="media" />
      </div>
    </div>
  );
}

export default SocialMedia;
