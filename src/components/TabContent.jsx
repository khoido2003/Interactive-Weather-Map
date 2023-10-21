import { useMemo, useState, useEffect, useCallback } from "react";
import styles from "./TabContent.module.scss";
import { useTabs } from "../contexts/tabsContext";

function TabContent() {
  const { content, activeTab } = useTabs();

  // Create a unique key for the h3 and p elements
  const [animationKey, setAnimationKey] = useState(activeTab);

  // Find the selected tab's content
  const detail = useMemo(
    () => content.find((el) => el.id === activeTab),
    [activeTab, content]
  );

  // Function to trigger the animation by updating the key
  const triggerAnimation = useCallback(() => {
    setAnimationKey(activeTab);
  }, [activeTab]);

  // Reset the animation when activeTab or content changes
  useEffect(() => {
    triggerAnimation();
  }, [activeTab, content, triggerAnimation]);

  return (
    <div className={styles["tabContent"]}>
      <h3 key={`h3-${animationKey}`} onAnimationEnd={triggerAnimation}>
        {detail.keyword}
      </h3>
      <p key={`p-${animationKey}`} onAnimationEnd={triggerAnimation}>
        {detail.details}
      </p>
    </div>
  );
}

export default TabContent;
