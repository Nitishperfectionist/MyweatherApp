import React, { useState } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

function Weatherapp() {
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
    const [temperature, setTemperature] = useState(0);
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);

    const api_key = "b805b831fca2c80a1e9f1a5efb348e44";

    const search = async () => {
        const cityInput = document.getElementsByClassName('cityInput')[0];
        if (cityInput.value === "") {
            return;
        }
        
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            setTemperature(data.main.temp);
            setLocation(data.name);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);

            const weatherCode = data.weather[0].icon;
            setWeatherIcon(getWeatherIcon(weatherCode));
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const getWeatherIcon = (code) => {
        switch (code) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
                return drizzle_icon;
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
                return rain_icon;
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={weatherIcon} alt='' />
            </div>
            <div className='weather-temp'>
                {temperature}°C
            </div>
            <div className='weather-location'>{location}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>{windSpeed} km/hr</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weatherapp;
