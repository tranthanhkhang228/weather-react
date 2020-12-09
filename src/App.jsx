import './App.css';
import { useRef, useState } from 'react';

import getImageForWeather from './utils/getImageForWeather.js';
import { fetchWeather } from './utils/api';

const App = () => {
  const [city, setCity] = useState('');

  const [data, setData] = useState({
    location: 'Danang',
    weather: 'Clear',
    temperature: 24
  });

  const inputRef = useRef(null);

  const focusMouseOnInput = () => {
    inputRef.current.focus();
  };

  const clearInput = () => {
    inputRef.current.value = '';
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleButtonClick = (e) => {
    handleGetData();
  };

  const handleEnterEvent = (e) => {
    if (e.key === 'Enter') {
      handleGetData();
    }
  };

  const handleGetData = async () => {
    const response = await fetchWeather(city.toLowerCase());

    if (!response) {
      alert('Location not found!');
      return;
    }

    setData(response);

    focusMouseOnInput();
    clearInput();
  };

  return (
    <div className='App'>
      <img src={getImageForWeather(data.weather)} alt='weather' />

      <p>{data.location}</p>
      <p>{data.weather}</p>
      <p>{data.temperature}&deg;C</p>

      <div>
        <input
          ref={inputRef}
          placeholder='Search city'
          value={city}
          onChange={handleInputChange}
          onKeyUp={handleEnterEvent}
        />

        <button onClick={handleButtonClick}>Search</button>
      </div>
    </div>
  );
};

export default App;
