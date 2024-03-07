import { SalesActivityWidget } from "@src/components/widgets/SalesActivityWidget";
import styles from "./page.module.scss";
import { Button } from "@src/components/Button";
import { ExpensesWidget } from "@src/components/widgets/ExpensesWidget";
import { StoreStaticsWidget } from "@src/components/widgets/StoreStaticsWidget";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <SalesActivityWidget />
      <div
        style={{ background: "#95b4ff", padding: 10, boxSizing: "border-box" }}
      >
        <Button>Details</Button>
        <Button style={{ background: "#7A55B8" }}>Enable</Button>
        <Button style={{ background: "#E16449" }}>Go Premium</Button>
      </div>
      <div style={{ background: "#95b4ff" }} />
      <StoreStaticsWidget />
      <div style={{ gridRow: "span 2", background: "#95b4ff" }} />
      <ExpensesWidget />
      <div style={{ background: "#95b4ff" }} />
      <div style={{ background: "#95b4ff" }} />
    </div>
  );
};

export default HomePage;
