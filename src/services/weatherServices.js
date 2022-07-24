import { DateTime } from "luxon";

const API_KEY = "10244731442eaf04215d9e321e12e47d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((day) => {
    return {
      title: formatToLocalTime(day.dt, timezone, "ccc"),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((day) => {
    return {
      title: formatToLocalTime(day.dt, timezone, "hh:mm:a"),
      temp: day.temp,
      icon: day.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => formatCurrentWeather(data));

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely,alerts",
    units: searchParams.units,
  }).then((data) => formatForecastWeather(data));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = `cccc, dd LLL yyyy`) =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrl };

export default getFormattedWeatherData;
