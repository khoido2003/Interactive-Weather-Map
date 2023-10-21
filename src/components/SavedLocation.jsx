import { useNavigate } from "react-router";
import { useAppControl } from "../contexts/AppControlContext";
import styles from "./SavedLocation.module.scss";
import { v4 as uuidv4 } from "uuid";

function SavedLocation() {
  const { list, setList, savedPositions, setSavedPositions } = useAppControl();

  function handleDeleteItem(id) {
    setSavedPositions((locations) =>
      locations.filter((location) => location.id !== id)
    );
  }

  return list ? null : (
    <div className={styles["container"]}>
      <button
        onClick={() => setList((list) => !list)}
        className={styles["btn--close"]}
      >
        &times;
      </button>
      <h1> Saved locations</h1>
      <h5>Click on the map to choose new location and save.</h5>

      <ul className={styles["locationList"]}>
        {savedPositions.map((location) => (
          <Location
            key={uuidv4()}
            data={location}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>

      <footer className={styles["footer"]}>
        <p>Designed by Khoi Do. </p>
        <p className={styles["copyright"]}>
          &copy; Copyright {new Date().getFullYear()} by Weatherwave (version
          1.0.0)
        </p>
      </footer>
    </div>
  );
}

export default SavedLocation;

function Location({ data, onDelete }) {
  const { id, countryName, city, locality, now, lat, lng } = data;
  const { setModal } = useAppControl();
  const navigate = useNavigate();

  const handleItemClick = (e) => {
    // Check if the target of the click event is not the "Delete" button
    if (!e.target.classList.contains(styles["btn-item--close"])) {
      e.preventDefault();
      setModal(false);
      navigate(`/app/modal?lat=${lat}&lng=${lng}`);
    }
  };

  return (
    <li className={`${styles["locationItem"]}`} onClick={handleItemClick}>
      <p className={styles["city"]}>{`${locality}`}</p>
      <p>{now}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(id);
        }}
        className={styles["btn-item--close"]}
      >
        Delete
      </button>
    </li>
  );
}
