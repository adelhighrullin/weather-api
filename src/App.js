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

  useEffect(() => {
    getWeather();
  }, [query]);

  const getWeather = async () => {

    /*
    setQuery({
      query: ""
    });
    */

    const response = await fetch(`https://api.weatherapi.com/v1/${mode}.json?key=${API_KEY}&q=${query}&aqi=${aqi}`);
    const data = await response.json();
    console.log(data);
    //const parse_data = await JSON.parse(data);

    //i should change it to key -> value, because right now it seems done bad
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
        <input type="text" placeholder="Type your city here: " value={search} onChange={updateSearch}/>
        <button type="submit" >Search</button>
      </form>
      <WeatherBlock
        city={info.city}
        country={info.country}
        temp_c={info.temp_c}
        cond={info.cond}
        icon={info.icon}
      />
    </div>
  );
}

export default App;
