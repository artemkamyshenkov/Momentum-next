'use client';

import React from 'react';
import { imageService } from '@/common/api/imageService';
import styles from './Slider.module.scss';

export const Slider = () => {
  const handleClickNext = async () => {
    try {
      const res = await imageService.getRandomImage();
      document.body.style.background = `url(${res.photo[0].url_l}) center/cover, rgba(0, 0, 0, 0.2)`;
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickPrev = () => console.log('prev');
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
      />
    </>
  );
};
