import { useSupports } from "../contexts/SupportContext";
import styles from "./SupportContent.module.scss";

function SupportContent() {
  const { content } = useSupports();

  return (
    <div className={styles["container"]}>
      {content.map((item, index) => (
        <SupportItem content={item} index={index} key={item.id} />
      ))}
    </div>
  );
}

export default SupportContent;

/////////////////////////////

function SupportItem({ content, index }) {
  const { title, description } = content;
  return (
    <div
      className={`${styles["supportContent"]} ${
        index % 2
          ? styles["supportContent--odd"]
          : styles["supportContent--even"]
      }`}
    >
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
