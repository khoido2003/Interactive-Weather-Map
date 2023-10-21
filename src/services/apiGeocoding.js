export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export async function fetchWeather(
  latitude,
  longitude,
  locality,
  setWeather,
  setIsLoading
) {
  try {
    setIsLoading(true);
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${locality}`
    );
    const geoData = await geoRes.json();
    if (!geoData.results) throw new Error("Location not found");

    const { latitude: lat, longitude: lng, timezone } = geoData.results.at(0);

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        latitude ? latitude : lat
      }&longitude=${
        longitude ? longitude : lng
      }&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );

    const weatherData = await weatherRes.json();

    setWeather(weatherData.daily);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
}
