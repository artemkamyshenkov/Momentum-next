'use client';

import React, { useEffect, useState } from 'react';
import { imageService } from '@/common/api/imageService';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import { BACKGROUND, CURRENT_BACKGROUND } from '@/common/constants';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import { setBgImage } from '@/common/helpers/setBgImage';
import { toast } from 'react-toastify';
import styles from './Slider.module.scss';

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
      await setBgImage(res);
      const currentBgState: CurrentBgState = {
        [CURRENT_BACKGROUND]: res,
      };
      setLocalStorage(BACKGROUND, currentBgState);
    } catch {
      const notifyError = () =>
        toast.error(
          'Произошла ошибка при загрузке фото, пожалуйста перезагрузите страницу',
          {
            hideProgressBar: true,
          },
        );
      notifyError();
    } finally {
      nextButtonTimer = setTimeout(() => {
        setNextButtonDisabled(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const savedBg: CurrentBgState = getLocalStorage(BACKGROUND);
    if (savedBg?.[CURRENT_BACKGROUND]) {
      setBgImage(savedBg[CURRENT_BACKGROUND]);
    }
    return () => clearTimeout(nextButtonTimer);
  }, []);

  return (
    <>
      {isNextButtonDisabled && <span className={styles.loader} />}
      {!isNextButtonDisabled && (
        <button
          type="button"
          className={styles.slideNext}
          onClick={handleClickNext}
          disabled={isNextButtonDisabled}
          title="Сменить фото"
        />
      )}
    </>
  );
};
