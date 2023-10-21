import styles from "./Weather.module.scss";
import { useURLPosition } from "../hooks/useURLPosition";
import { useAppControl } from "../contexts/AppControlContext";
import { fetchWeather } from "../services/apiGeocoding";
import { useEffect } from "react";
import Spinner from "./Spinner";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function Weather({ position, locality }) {
  const [latitude, longitude] = useURLPosition();
  const { weather, setWeather, setIsLoading, isLoading } = useAppControl();

  useEffect(
    function () {
      if (locality) {
        fetchWeather(latitude, longitude, locality, setWeather, setIsLoading);
      }
    },
    [latitude, longitude, locality, setWeather, setIsLoading]
  );

  return (
    <div className={styles["container"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>
            Weather in{" "}
            <span>
              {locality}, {position?.city}
            </span>
          </h2>
          <ul className={styles["weather"]}>
            {weather?.time?.map((date, i) => (
              <Day
                date={date}
                max={weather?.temperature_2m_max[i]}
                min={weather?.temperature_2m_min[i]}
                code={weather?.weathercode[i]}
                key={date}
                isToday={i === 0}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className={styles["day"]}>
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg;C &mdash; <strong>{Math.ceil(max)}&deg;C</strong>
      </p>
    </li>
  );
}

export default Weather;
