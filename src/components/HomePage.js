import React, { useState } from "react";
import axios from "axios";

function Homepage({ isLogin, username, history }) {
  const [cityName, setCityName] = useState(""),
    [weatherState, setWeatherState] = useState(null),
    [countryName, setCountryName] = useState("");

  function handleCity(e) {
    setCityName(e.target.value);
  }

  function handleCountry(e) {
    setCountryName(e.target.value);
  }

  const savedSearchHistory = (search) => {
    // Check If User Is Logged In

    if (isLogin) {
      // Get Existing History
      const existingHistoryJSON = localStorage.getItem("searchHistory");
      // Parse History JSON to Object
      const existingHistory = existingHistoryJSON
        ? JSON.parse(existingHistoryJSON)
        : {};

      // Get History For Logged In User it will be an array
      const userHistory = existingHistory[username]
        ? existingHistory[username]
        : [];
      // Push New Search Into User History Array and Update All History
      userHistory.push(search);
      existingHistory[username] = userHistory;
      // Push Updates to localStorage

      localStorage.setItem("searchHistory", JSON.stringify(existingHistory));
    }
  };

  const getWeather = () => {
    if (countryName && cityName)
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=19efa355f6905cba33050ca636ef5ca3&query=${cityName},${countryName}`
        )
        .then((res) => {
          setWeatherState({ ...res.data });
          savedSearchHistory({ countryName, cityName });
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <div>
        <div className="d-flex">
            <div className="weather-input">
                <h3 className="py-3">Hey there, would you like to know the weather situation near you? <br></br> Type a city and country below :) </h3>
                <input
                className="form-control city-name"
                type="text"
                value={cityName}
                onChange={handleCity}
                placeholder="City"
                />

                <input
                className="form-control country-name"
                type="text"
                value={countryName}
                onChange={handleCountry}
                placeholder="Country"
                />
                <button className="btn btn-dark" onClick={getWeather}>Get Weather</button>
            </div>

 

                {weatherState && (
                <div className="response">
                  <h1>{`${weatherState.location.name}, ${weatherState.location.country}`}</h1>
                  <p>{weatherState.location.timezone_id}</p>

                  <img src={weatherState.current.weather_icons[0]} alt="" />

                  <h3>{weatherState.current.temperature} &#176;</h3>
                  <h4>{weatherState.current.weather_descriptions}</h4>
                </div>
              )}
        </div>
       

      {history && (
        <table style={{ width: 200 }}>
          <thead>
            <tr>
              <th>City Name</th>
              <th>Country Name</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr>
                <td>{h.cityName}</td>
                <td>{h.countryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Homepage;
