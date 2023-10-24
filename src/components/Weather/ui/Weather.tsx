'use client';

import { weatherService } from '@/common/api/weatherService';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import type { WeatherData } from '@/common/types/weather';
import { DEFAULT_CITY } from '@/common/constants';
import { useDebounce } from '@/common/hooks/useDebounce';
import styles from './Weather.module.scss';

// TODO: в ls значение + LOADER
export const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>();
  const [city, setCity] = useState(DEFAULT_CITY);
  const debouncedCity = useDebounce(city, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setCity(value);
  };
  useEffect(() => {
    const getWeatherData = async () => {
      const weatherData = await weatherService.getWeatherByCity(debouncedCity);
      setCurrentWeather(weatherData);
    };
    getWeatherData();
  }, [debouncedCity]);

  return (
    currentWeather && (
      <div className={styles.weatherContainer}>
        <input
          type="text"
          className={styles.inputWeather}
          onChange={handleChange}
        />
        <i
          className={cn(
            'weather-icon owf',
            `owf-${currentWeather?.weather[0].id}`,
            styles.icon,
          )}
        />
        <div>
          <span className={styles.temp}>
            {Math.floor(currentWeather?.main?.temp || 0)}°C
          </span>
          <span>{currentWeather?.weather[0].description}</span>
        </div>
        <div>
          Скорость ветра: {Math.floor(currentWeather?.wind?.speed || 0)} м/с
        </div>
        <div>Влажность: {Math.floor(currentWeather.main.humidity)}%</div>
      </div>
    )
  );
};
