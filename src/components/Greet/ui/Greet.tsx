'use client';

import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useDebounce } from '@/common/hooks/useDebounce';
import { PERSON_NAME } from '@/common/constants';
import { setLocalStorage } from '@/common/helpers/setLocalStorage';
import { getLocalStorage } from '@/common/helpers/getLocalStorage';
import { getGreetingDeclination } from '../helpers/getGreetingDeclination';
import styles from './Greet.module.scss';

// TODO: центрирование через css?
export const Greet = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const currentTime = new Date().getHours();
  const greetMessage = getGreetingDeclination(currentTime);
  const debouncedValue = useDebounce(name, 1000);

  const setDynamicInputWidth = (value: string) => {
    if (inputRef.current) {
      inputRef.current.style.width = `${1 + (value?.length || 13)}rem`;
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setName(value);
    setDynamicInputWidth(value);
  };

  useEffect(() => {
    if (debouncedValue) {
      setLocalStorage(PERSON_NAME, debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const savedName = getLocalStorage(PERSON_NAME);
    if (savedName) {
      setName(savedName);
      setDynamicInputWidth(savedName);
    }
  }, []);

  return (
    <div className={styles.greetContainer}>
      {name && (
        <span className={styles.greetMessage}>{`${greetMessage}, `}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={handleValueChange}
        className={cn(styles.input, { [styles.inputMaxWidth]: !name })}
        placeholder="Как вас зовут?"
      />
    </div>
  );
};
