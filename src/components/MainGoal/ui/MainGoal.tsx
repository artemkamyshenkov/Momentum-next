'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import { useDebounce } from '@/common/hooks/useDebounce';
import { MESSAGES, PERSON_GOAL } from '@/common/constants';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import styles from './MainGoal.module.scss';

export const MainGoal = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const debouncedValue = useDebounce(value, 300);

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target?.value;
    if (newValue !== value) {
      setValue(newValue);
    }
  };

  const handleFocus = () => {
    if (!value) {
      setValue(MESSAGES.DEFAULT_GOAL_TEXT);
    }
    const textarea = ref?.current;
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(
          textarea?.value.length,
          textarea?.value.length,
        );
      }
    }, 0);
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
    if (!value) {
      setLocalStorage(PERSON_GOAL, '');
    }
  }, [debouncedValue, value]);

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
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={handleValueChange}
        rows={3}
      />
    </div>
  );
};
