'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import { useDebounce } from '@/common/hooks/useDebounce';
import { PERSON_GOAL } from '@/common/constants';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import styles from './MainGoal.module.scss';

// TODO: поправить и проверить получаемое значение из ls на пустую строку
export const MainGoal = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const debouncedValue = useDebounce(value, 300);

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target?.value;
    setValue(value);
  };

  const handleFocus = () => {
    if (!value) {
      setValue('Моя главная цель на сегодня: ');
    }
  };

  const handleBlur = () => {
    if (!value) {
      setValue('');
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      setLocalStorage(PERSON_GOAL, debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const savedGoal = getLocalStorage(PERSON_GOAL);
    if (savedGoal) {
      setValue(savedGoal);
    }
  }, []);

  return (
    <div className={styles.goalContainer}>
      <textarea
        className={styles.input}
        placeholder="Какая ваша главная цель на сегодня?"
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={handleValueChange}
        rows={3}
      />
    </div>
  );
};
