import React from 'react';
import './App.css';

function WeatherBlock(props) {
  return (
    <div className="WeatherBlock">
      <img className="Icon" src={props.icon} alt={props.cond} />
      <div className="Condition">{props.cond}</div>
      <div className="Temperature">{props.temp_c}&deg;C</div>
      <div className="Location">{props.city},<br />{props.country}</div>
    </div>
  );
}

export default WeatherBlock;