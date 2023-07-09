import { Weather } from "@/types/type";

interface NavWeatherProps {
  weatherData? : Weather
  Icon? : string
}

const NavWeather:React.FC<NavWeatherProps> = ({weatherData, Icon}) => {
  const tempMax = Math.floor(weatherData?.main.temp_max ?? 0);
  const temp = Math.floor(weatherData?.main.temp ?? 0);
  const tempMin = Math.floor(weatherData?.main.temp_min ?? 0);

  return (
    <>
      <h2 className="flex justify-center text-white text-xl font-semibold font-sans">
        오늘 날씨
      </h2>
      <div className="flex justify-center">
        <img src={Icon} alt="" width={100} height={100}/>
      </div>
      <ul className="text-white flex w-full justify-between">
        <li className="text-sm flex flex-col justify-start items-center text-gray-300">
          <p>{tempMax}°C</p>
          <p>최고</p>
        </li> 
        <li className="font-bold text-2xl">
          {temp}°C
        </li> 
        <li className="text-sm flex flex-col justify-start items-center text-gray-300">
          <p>{tempMin}°C</p>
          <p>최저</p>
        </li> 
      </ul>
    </>
  );
};

export default NavWeather;