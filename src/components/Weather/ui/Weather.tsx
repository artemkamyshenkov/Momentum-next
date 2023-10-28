'use client';

import { weatherService } from '@/common/api/weatherService';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import type { WeatherData } from '@/common/types/weather';
import { DEFAULT_CITY, DEFAULT_CITY_KEY } from '@/common/constants';
import { useDebounce } from '@/common/hooks/useDebounce';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import styles from './Weather.module.scss';

export const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>();
  const [city, setCity] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const debouncedCity = useDebounce(city, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setCity(value);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weatherData = await weatherService.getWeatherByCity(
          debouncedCity!,
        );
        setCurrentWeather(weatherData);
        setError(undefined);
      } catch (error) {
        setError('Город не найден');
      }
    };
    getWeatherData();
  }, [debouncedCity]);

  useEffect(() => {
    if (debouncedCity) {
      setLocalStorage(DEFAULT_CITY_KEY, debouncedCity);
    }
  }, [debouncedCity, city]);

  useEffect(() => {
    const savedCity = getLocalStorage(DEFAULT_CITY_KEY);
    if (savedCity) {
      setCity(savedCity);
    }
    if (!savedCity) {
      setCity(DEFAULT_CITY);
    }
  }, []);

  return (
    <div className={styles.weatherContainer}>
      <input
        type="text"
        className={styles.inputWeather}
        onChange={handleChange}
        value={city}
      />
      {currentWeather && !error && (
        <>
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
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
