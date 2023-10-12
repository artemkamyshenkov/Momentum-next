'use client';

import React, { useEffect, useState } from 'react';
import styles from './Date.module.scss';

export const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    setCurrentDate(currentDate);
  }, []);
  return <div className={styles.date}>{currentDate}</div>;
};
