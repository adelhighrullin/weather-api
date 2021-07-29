import React, { useState } from 'react';
import './App.css';
import Header from "./Header";
import WeatherBlock from "./WeatherBlock";
//import Footer from "./Footer";



//const getWeather = async () => {

//}

function App() {

  const API_KEY = "c889405c4f6d4e738b175950212907";
  let q = "London";
  let aqi = "no";
  let temp_c = 0;

  const [state, setstate] = useState({ temp: "" });

  const getWeather = async () => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${q}&aqi=${aqi}`);
    const data = await response.json();
    console.log(data);
    //const parse_data = await JSON.parse(data);
    temp_c = await data["current"]["temp_c"];
    console.log(temp_c);

    setstate({ temp: temp_c });
  }
  return (
    <div className="App">
      <Header />
      <form className="Search">
        <input type="text" placeholder="Type your city here: " />
        <button type="button" onClick={getWeather}>Search</button>
      </form>
      <WeatherBlock
        temp_c={state.temp}
      />
    </div>
  );
}

export default App;
