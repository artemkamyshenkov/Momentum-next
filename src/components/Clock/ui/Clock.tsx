'use client';

import React, { useEffect, useState } from 'react';
import styles from './Clock.module.scss';

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<Date>();

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  const renderTime = currentTime?.toLocaleTimeString('ru-RU', {
    hour12: false,
  });

  return <div className={styles.clock}>{renderTime}</div>;
};
