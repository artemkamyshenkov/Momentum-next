'use client';

import { weatherService } from '@/common/api/weatherService';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import type { WeatherData } from '@/common/types/weather';
import styles from './Weather.module.scss';

export const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>();

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherData = await weatherService.getWeatherByCity('Moscow');
      setCurrentWeather(weatherData);
    };
    getWeatherData();
  }, []);
  return (
    <div>
      <i
        className={cn(
          'weather-icon owf',
          `owf-${currentWeather?.weather[0].id}`,
          styles.icon,
        )}
      />
    </div>
  );
};
