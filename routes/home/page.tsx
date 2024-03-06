import { SalesActivityWidget } from "@src/components/SalesActivityWidget";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <SalesActivityWidget />
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
