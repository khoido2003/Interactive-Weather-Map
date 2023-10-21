import { useEffect, useState, useCallback, useRef } from "react";
import { useURLPosition } from "../hooks/useURLPosition";
import styles from "./Modal.module.scss";
import { useAppControl } from "../contexts/AppControlContext";
import { formatDate } from "../services/helpers";
import { useNavigate } from "react-router";

import { v4 as uuidv4 } from "uuid";
import Weather from "./Weather";

function Modal() {
  const { modal, setModal, savedPositions, setSavedPositions, setLocation } =
    useAppControl();
  const [lat, lng] = useURLPosition();
  const [position, setPosition] = useState();
  const [locality, setLocality] = useState();
  const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);

  const navigate = useNavigate();
  const [dataSaved, setDataSaved] = useState(false); // Track whether data is saved

  const fetchCityData = useCallback(
    async function () {
      try {
        setIsLoadingGeoCoding(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a country? Click somewhere else 😋"
          );

        if (data) {
          setIsLoadingGeoCoding(false);
          const { locality, city, countryName } = data;
          const now = formatDate(new Date());
          const id = uuidv4();
          const newPosition = {
            id,
            lat,
            lng,
            locality,
            city,
            countryName,
            now,
          };
          setPosition(newPosition);
          setLocality(locality);
          setLocation(newPosition);
          setDataSaved(false); // Reset the dataSaved state
        }
      } catch (err) {
        console.log(err);
      }
    },
    [lat, lng, setDataSaved, setLocation]
  );

  // Create a ref to track the initial render
  const initialRender = useRef(true);

  // Use a separate useEffect to fetch data on the initial render
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (lat && lng) {
      fetchCityData();
    }
  }, [fetchCityData, lat, lng]);

  // Handle the "Add to bookmarks" button click
  const handleAddToBookmarks = () => {
    // Save position to local storage
    if (position) {
      setSavedPositions((saved) => [...saved, position]);
      setDataSaved(true); // Data is saved
    }
  };

  // Check if data is saved before navigating
  useEffect(() => {
    if (dataSaved) {
      navigate("/app");
    }
  }, [dataSaved, navigate]);

  return modal ? null : (
    <div className={styles["container"]}>
      <button
        className={styles["btn--close"]}
        onClick={() => setModal((modal) => !modal)}
      >
        &times;
      </button>
      <button className={styles["btn--add"]} onClick={handleAddToBookmarks}>
        Add to bookmarks
      </button>

      <Weather position={position} locality={locality} />
    </div>
  );
}

export default Modal;
