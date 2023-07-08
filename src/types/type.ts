export type Weather = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [
    {
      icon: string;
      description: string;
      main: string;
    }
  ];
};