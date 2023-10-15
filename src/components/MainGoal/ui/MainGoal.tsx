'use client';

import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import styles from './MainGoal.module.scss';

// TODO: сделать из laceholder текст и сохранить в ls
export const MainGoal = () => {
  const [value, setValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target?.value;
    setValue(value);
  };

  return (
    <div className={styles.goalContainer}>
      <textarea
        className={styles.input}
        placeholder={
          inputFocus
            ? 'Моя главная цель на сегодня'
            : 'Какая ваша главная цель на сегодня?'
        }
        ref={inputRef}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        value={value}
        onChange={handleValueChange}
        rows={3}
      />
    </div>
  );
};
