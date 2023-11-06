'use client';

import React, { useEffect, useState } from 'react';
import { imageService } from '@/common/api/imageService';
import styles from './Slider.module.scss';
/* 
TODO: 
1. Индикатор загрузки нового фото чтобы не появлялост дефолное
2. Сохранить текущее фото и предыдущее
*/
export const Slider = () => {
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  let nextButtonTimer: ReturnType<typeof setTimeout>;
  const handleClickNext = async () => {
    try {
      setNextButtonDisabled(true);
      const res = await imageService.getRandomImage();
      document.body.style.background = `url(${res}) center/cover, rgba(0, 0, 0, 0.2)`;
    } catch (error) {
      console.error(error);
    } finally {
      nextButtonTimer = setTimeout(() => {
        setNextButtonDisabled(false);
      }, 5000);
    }
  };
  const handleClickPrev = () => console.log('prev');

  useEffect(
    () => () => {
      clearTimeout(nextButtonTimer);
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        className={styles.slidePrev}
        onClick={handleClickPrev}
      />
      <button
        type="button"
        className={styles.slideNext}
        onClick={handleClickNext}
        disabled={isNextButtonDisabled}
      />
    </>
  );
};
