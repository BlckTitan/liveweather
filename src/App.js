import './App.css';
//component
import Search from "./Search/Search";
import Nav from './Nav/Nav';
import { useState } from 'react';
//api parameters
import { WeatherApiKey } from './Api/Api';

function App() {

  const [currentWeatherReport, setCurrentWeatherReport] = useState(null);
  const [weatherForecastReport, setWeatherForecastReport] = useState(null);

  const handleSearch = (searchData) => {
    //we take the location data (longitude and latitue)
    //and pass it into the openWeather Api to the the current weather data and weather forecast data
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    const weatherForecastFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    
    Promise.all([currentWeatherFetch, weatherForecastFetch])
    .then(async (response) => {
      const currentWeatherResponse = await response[0].json();
      const weatherForecastResponse = await response[1].json();

      setCurrentWeatherReport(currentWeatherResponse)
      setWeatherForecastReport(weatherForecastResponse)
    })
  }

  return (
    <div className="container">
      <Nav>LiveWeather</Nav>
      <Search searchBarData={handleSearch}/>
    </div>
  );
}

export default App;
//react accessible accordion
//react select async paginate