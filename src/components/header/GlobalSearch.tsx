import Search01 from "@src/assets/icons/hugeicons/search01.svg?component";

import styles from "./GlobalSearch.module.scss";
import { useState } from "react";
import clsx from "clsx";

export const GlobalSearch = () => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.root}>
      <Search01 className={styles.icon} width={24} height={24} />
      <input
        type="search"
        className={clsx(styles.input, value && styles.nonEmpty)}
        placeholder="Search anything here"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
