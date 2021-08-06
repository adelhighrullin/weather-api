import React from 'react';

function WeatherBlock(props) {
  return (
    <div className="WeatherBlock">
      <p>{props.city}, {props.country}</p>
      <p>Temperature: {props.temp_c}&deg;C</p>
      <p>{props.cond}</p>
      <img src={props.icon} alt={props.condition}/>
    </div>
  );
}

export default WeatherBlock;