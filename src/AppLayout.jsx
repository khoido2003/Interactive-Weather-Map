import { Outlet } from "react-router";
import styles from "./AppLayout.module.scss";
import Map from "./components/Map";
import NavBarMap from "./components/NavBarMap";
import SavedLocation from "./components/SavedLocation";
import { AppControlProvider } from "./contexts/AppControlContext";

function AppLayout() {
  return (
    <AppControlProvider>
      <div className={styles["container"]}>
        <Map />
        <SavedLocation />
        <NavBarMap />
        <Outlet />
      </div>
    </AppControlProvider>
  );
}

export default AppLayout;
