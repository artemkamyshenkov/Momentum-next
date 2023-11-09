'use client';

import React, { useEffect, useState } from 'react';
import { imageService } from '@/common/api/imageService';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import {
  BACKGROUND,
  CURRENT_BACKGROUND,
  PREV_BACKGROUND,
} from '@/common/constants';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import styles from './Slider.module.scss';
/* 
TODO: 
1. Индикатор загрузки нового фото чтобы не появлялост дефолное
2. Сохранить текущее фото и предыдущее. Дебаг логики
*/
interface CurrentBgState {
  [PREV_BACKGROUND]: string;
  [CURRENT_BACKGROUND]: string;
}
export const Slider = () => {
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [currentBg, setCurrentBg] = useState<string>('');
  const [prevBg, setPrevBg] = useState<string>('');
  let nextButtonTimer: ReturnType<typeof setTimeout>;

  const handleClickNext = async () => {
    try {
      const savedBg: CurrentBgState = getLocalStorage(BACKGROUND);
      const currentSavedBg = savedBg[CURRENT_BACKGROUND];

      if (currentBg === currentSavedBg) {
        document.body.style.background = `url(${currentBg}) center/cover, rgba(0, 0, 0, 0.2)`;
        return;
      }
      setNextButtonDisabled(true);
      const res = await imageService.getRandomImage();
      document.body.style.background = `url(${res}) center/cover, rgba(0, 0, 0, 0.2)`;
      setCurrentBg(res);
      setPrevBg(currentBg);
      const currentBgState: CurrentBgState = {
        [CURRENT_BACKGROUND]: res,
        [PREV_BACKGROUND]: currentBg,
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
  const handleClickPrev = () => {
    const savedBg: CurrentBgState = getLocalStorage(BACKGROUND);
    const prevSavedBg = savedBg[PREV_BACKGROUND];
    if (prevSavedBg) {
      document.body.style.background = `url(${prevSavedBg}) center/cover, rgba(0, 0, 0, 0.2)`;
      setCurrentBg(prevSavedBg);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(nextButtonTimer);
    },
    [],
  );
  useEffect(() => {
    console.log(prevBg);
  }, [prevBg]);

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
