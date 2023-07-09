import {useState, useEffect} from 'react';
import axios from 'axios';
import useGeoLocation from '@/hooks/useGeoLocation'
import Navigation from './NavItem'
import { Weather } from '@/types/type';

const Nav = () => {
  const geoLocation = useGeoLocation();

  const [weatherData, setWeatherData] = useState<Weather>();
  const [Icon, setIcon] = useState<string>("");

  useEffect(() => {
    const WeatherGet = () => {
      const latitude = geoLocation?.coordinates?.lat;
      const longitude = geoLocation?.coordinates?.lng;
      const Key = import.meta.env.VITE_WEATHER_KEY as string;

      if (latitude && longitude) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}&units=metric&lang=kr`)
          .then((response) => {
            const weatherData: Weather = response.data as Weather;
            setWeatherData(weatherData);
            setIcon(weatherData.weather[0].icon);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  
    WeatherGet();
  }, [geoLocation?.coordinates?.lat, geoLocation?.coordinates?.lng]);

  const iconUrl = "http://openweathermap.org/img/w/" + Icon + ".png";

  return (
    <nav className='w-full h-18 flex justify-end pr-8 pt-4'>
      <Navigation weatherData={weatherData} Icon={iconUrl}/>
    </nav>
  )
}

export default Nav
