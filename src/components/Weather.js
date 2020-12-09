import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [country, setCountry] = useState("");
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const getWeather = (e) => {
    e.preventDefault();
    if (country && city)
      axios
        .get(
          `https://api.weatherstack.com/current?access_key=f62617ac0b079358ce0f5b65314c2954&query=${country},${city}`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <div className="App">
      <form onSubmit={getWeather}>
        <input type="text" placeholder="Country" onChange={handleCountry} />
        <p>{country}</p>
        <input type="text" placeholder="City" onChange={handleCity} />
        <p>{city}</p>

        <button type="submit">Search</button>
      </form>
      {weather && <p>{weather.current.weather_description}</p>}
    </div>
  );
}
