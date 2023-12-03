'use client';

import { Drawer } from '@/common/ui';
import type { ChangeEvent, KeyboardEvent } from 'react';
import React, { useState } from 'react';
import TasksIcon from '@/common/icons/tasks.svg';
import Plus from '@/common/icons/plus.svg';
import Clear from '@/common/icons/clear.svg';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
  };

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target?.value);
  };

  const handleSubmit = () => {
    console.log('Выполняется сабмит с текстом:', inputValue);
    // Ваша логика обработки сабмита
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
      e.preventDefault();
    }
  };

  const handleClear = () => {
    if (inputValue) {
      setInputValue('');
    }
  };
  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        title="Текущие задачи"
      >
        <div className={styles.addContainer}>
          <button type="button" className={styles.addBtn}>
            <Plus />
          </button>
          <div className={styles.inputContainer}>
            <input
              placeholder="Добавить задачу"
              className={styles.addInput}
              maxLength={150}
              autoComplete="off"
              value={inputValue}
              onChange={handleInputValueChange}
              onKeyDown={handleKeyPress}
              type="search"
            />
            {inputValue && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClear}
              >
                <Clear />
              </button>
            )}
          </div>
        </div>
      </Drawer>
      <button
        type="button"
        className={styles.taskListOpenBtn}
        onClick={handleDrawerToggle}
      >
        <TasksIcon />
      </button>
    </>
  );
};
