import './App.css';
import { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };
  console.log(weather);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {Object.keys(weather).length !== 0 && !weather.error && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.location.name}</span>
            <sup>{weather.location.country}</sup>
          </h2>
          <div className="city-temp">
            {weather.current.temp_c}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              className="city-icon"
            />
            <p>{weather.current.condition.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
