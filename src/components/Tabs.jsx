import styles from "./Tabs.module.scss";
import { useTabs } from "../contexts/TabsContext";

function Tabs() {
  const { content } = useTabs();

  return (
    <ul className={styles["container"]}>
      {content.map((detail) => (
        <Tab num={detail.id} detail={detail} key={detail.id} />
      ))}
    </ul>
  );
}

export default Tabs;

function Tab({ detail, num }) {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <li
      className={activeTab === num ? styles["tab--active"] : styles["tab"]}
      onClick={() => setActiveTab(num)}
    >
      {detail.title}
    </li>
  );
}
