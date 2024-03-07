import Diamond02 from "@src/assets/icons/hugeicons/diamond02.svg?component";
import Wallet01 from "@src/assets/icons/hugeicons/wallet01.svg?component";
import { CtaCardWidget } from "@src/components/widgets/CtaCardWidget";
import { ExpensesWidget } from "@src/components/widgets/ExpensesWidget";
import { SalesActivityWidget } from "@src/components/widgets/SalesActivityWidget";
import { StoreStaticsWidget } from "@src/components/widgets/StoreStaticsWidget";

import styles from "./page.module.scss";
import { useLoaderData } from "react-router";
import { HomeLoaderData } from "./loader";

const HomePage = () => {
  const { sales } = useLoaderData() as HomeLoaderData;

  return (
    <div className={styles.page}>
      <SalesActivityWidget sales={sales} />

      <div style={{ background: "#95b4ff" }} />

      <CtaCardWidget
        icon={<Wallet01 width={48} height={48} />}
        title="Wallet Verification"
        description="Enable 2-step verification to secure your wallet."
        ctaText="Enable"
        accentColor="#7A55B8"
      />

      <StoreStaticsWidget />

      <div style={{ gridRow: "span 2", background: "#95b4ff" }} />

      <ExpensesWidget />

      <div style={{ background: "#95b4ff" }} />
      
      <CtaCardWidget
        icon={<Diamond02 width={48} height={48} />}
        title="Go Premium"
        description={"Receive a 10% discount!\nTap into enhanced capabilities."}
        ctaText="Go Premium"
        accentColor="#E16449"
      />
    </div>
  );
};

export default HomePage;
