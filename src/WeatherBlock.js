import React from 'react';

function WeatherBlock(props) {
  return (
    <div className="WeatherBlock">
      <p>Температура: {props.temp_c}</p>
    </div>
  );
}

export default WeatherBlock;