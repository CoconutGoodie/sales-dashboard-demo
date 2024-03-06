import { ActivityWidget } from "@src/components/ActivityWidget";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <ActivityWidget />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ gridRow: "span 2", background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
    </div>
  );
};

export default HomePage;
