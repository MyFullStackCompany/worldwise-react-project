import styles from "./AppLayout.module.css";

import { Sidebar } from "../components";
import { Map } from "../components";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
