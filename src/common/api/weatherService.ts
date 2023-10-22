import axios from 'axios';
import type { WeatherData } from '../types/weather';

const weatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});
export const weatherService = {
  getWeatherByCity: (city: string): Promise<WeatherData> =>
    weatherInstance
      .get(
        `?q=${city}&lang=ru&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}&units=metric`,
      )
      .then(res => res.data)
      .catch(e => Promise.reject(new Error(e))),
};
