import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import WeatherBlock from "./WeatherBlock";

function App() {

  const API_KEY = "c889405c4f6d4e738b175950212907";

  //gotta make a list of modes (current, forecast, etc) to choose one that is needed
  let mode = "current";
  let aqi = "no";

  const [info, setInfo] = useState({
    city: "",
    country: "",
    temp_c: "",
    cond: "",
    icon: ""
  });

  const [query, setQuery] = useState("London");

  const [search, setSearch] = useState("");

  const [responseCode, setResponseCode] = useState(true);

  useEffect(() => {
    getResponse();
  }, [query]);

  const getResponse = async () => {
    //don't know whether it's correct or not, but i works as i want it to work (:D)
    //gotta use ErrorBoundary instead
    const response = await fetch(`https://api.weatherapi.com/v1/${mode}.json?key=${API_KEY}&q=${query}&aqi=${aqi}`);
    setResponseCode(response.ok);
    if (response.ok) {
      getWeather(response);
    }
  }

  const getWeather = async (response) => {


    //TODO: make exceptions via try..catch to give an answer when the city is not found
    //const response = await fetch(`https://api.weatherapi.com/v1/${mode}.json?key=${API_KEY}&q=${query}&aqi=${aqi}`);
    //setResponseCode(response.status);

    const data = await response.json();
    console.log(data);
    //const parse_data = await JSON.parse(data);

    //i should change it to key -> value, because right now it seems done bad
    //or maybe make it as a list or smth
    const city = await data["location"]["name"];
    const country = await data["location"]["country"];
    const temp_c = await data["current"]["temp_c"];
    const cond = await data["current"]["condition"]["text"];
    const icon = await data["current"]["condition"]["icon"];

    setInfo({
      city: city,
      country: country,
      temp_c: temp_c,
      cond: cond,
      icon: icon
    });

  }

  const updateSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const sendQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <Header />
      <form className="Search" onSubmit={sendQuery}>
        <input type="text" placeholder="Type your city here: " value={search} onChange={updateSearch} />
        <button type="submit" >Search</button>
      </form>
      <div>
        {
          responseCode
            ? <WeatherBlock
              city={info.city}
              country={info.country}
              temp_c={info.temp_c}
              cond={info.cond}
              icon={info.icon}
            />
            : <p>no matches found. please check if the city was spelled correctly</p>
        }
      </div>

    </div>
  );
}

export default App;