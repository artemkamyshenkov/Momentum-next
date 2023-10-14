'use client';

import type { ChangeEvent } from 'react';
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { getGreetingDeclination } from '../helpers/getGreetingDeclination';
import styles from './Greet.module.scss';

export const Greet = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const currentTime = new Date().getHours();
  const greetMessage = getGreetingDeclination(currentTime);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target?.value);
    if (inputRef.current) {
      inputRef.current.style.width = `${5 + (name?.length || 1)}rem`;
    }
  };

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
