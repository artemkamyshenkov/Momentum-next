interface WeatherDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherData {
  weather: [WeatherDescription];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}
