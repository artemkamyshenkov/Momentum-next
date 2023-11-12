'use client';

import React, { useEffect, useState } from 'react';
import { imageService } from '@/common/api/imageService';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import { BACKGROUND, CURRENT_BACKGROUND } from '@/common/constants';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import styles from './Slider.module.scss';
/* 
TODO: 
1. Индикатор загрузки нового фото чтобы не появлялост дефолное
2. Сохранить текущее фото и предыдущее. Дебаг логики
*/
interface CurrentBgState {
  [CURRENT_BACKGROUND]: string;
}
export const Slider = () => {
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  let nextButtonTimer: ReturnType<typeof setTimeout>;

  const handleClickNext = async () => {
    try {
      setNextButtonDisabled(true);
      const res = await imageService.getRandomImage();
      document.body.style.background = `url(${res}) center/cover, rgba(0, 0, 0, 0.2)`;
      const currentBgState: CurrentBgState = {
        [CURRENT_BACKGROUND]: res,
      };
      setLocalStorage(BACKGROUND, currentBgState);
    } catch (error) {
      console.error(error);
    } finally {
      nextButtonTimer = setTimeout(() => {
        setNextButtonDisabled(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const savedBg: CurrentBgState = getLocalStorage(BACKGROUND);
    if (savedBg?.[CURRENT_BACKGROUND]) {
      document.body.style.background = `url(${savedBg?.[CURRENT_BACKGROUND]}) center/cover, rgba(0, 0, 0, 0.2)`;
    }
    return () => clearTimeout(nextButtonTimer);
  }, []);

  return (
    <button
      type="button"
      className={styles.slideNext}
      onClick={handleClickNext}
      disabled={isNextButtonDisabled}
      title="Сменить фото"
    />
  );
};
