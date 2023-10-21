import styles from "./NavBarMap.module.scss";
import Logo from "./Logo";

import { HiBookmark, HiLocationMarker, HiMenu } from "react-icons/hi";
import { useAppControl } from "../contexts/AppControlContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function NavBarMap() {
  const {
    setList,
    setMapPosition,
    setModal,
    setWeather,
    setIsLoading,
    toggleBtn,
    setToggleBtn,
  } = useAppControl();
  const { isLoading, position, error, getPosition } = useGeolocation();

  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (location.length < 2) return setWeather({});

    try {
      setIsLoading(true);

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
      navigate(`/app/modal?lat=${latitude}&lng=${longitude}`);
      setModal((modal) => (modal === false ? modal : !modal));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  useEffect(
    function () {
      if (position) {
        setMapPosition([position.lat, position.lng]);
        navigate(`modal?lat=${position.lat}&lng=${position.lng}`);
        setModal((modal) => (modal === false ? modal : !modal));
      }
    },
    [position, navigate, setMapPosition, setModal]
  );

  return (
    <div className={styles["container"]}>
      <Logo />
      <input
        type="text"
        placeholder="Search a place"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        value={location}
      />
      <div className={styles["btnContainer"]}>
        {error ? (
          <button
            className={`${styles["btn"]} ${styles["btn--warning"]}`}
            onClick={getPosition}
            disabled={isLoading}
          >
            Please enable geolocation and reload!
          </button>
        ) : (
          <button
            className={`${styles["btn"]} `}
            onClick={getPosition}
            disabled={isLoading}
          >
            Current location <HiLocationMarker />{" "}
          </button>
        )}
        <button
          onClick={() => setList((list) => !list)}
          className={`${styles["btn"]}`}
        >
          Bookmarks <HiBookmark />
        </button>
      </div>
      {/* ///////////////////////////////////////// */}
      {/* RESPONSIVE BUTTON */}

      <button
        className={styles["btn--small-screen"]}
        onClick={() => setToggleBtn((btn) => !btn)}
      >
        <HiMenu />
      </button>

      {toggleBtn ? (
        <div className={styles["btnContainer--small-screen"]}>
          {error ? (
            <button
              className={`${styles["btn"]} ${styles["btn--warning"]}`}
              onClick={getPosition}
              disabled={isLoading}
            >
              Please enable geolocation and reload!
            </button>
          ) : (
            <button
              className={`${styles["btn"]} `}
              onClick={() => {
                getPosition();
                setToggleBtn(false);
              }}
              disabled={isLoading}
            >
              Current location <HiLocationMarker />{" "}
            </button>
          )}
          <button
            onClick={() => {
              setList((list) => !list);
              setToggleBtn(false);
            }}
            className={`${styles["btn"]}`}
          >
            Bookmarks <HiBookmark />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default NavBarMap;
