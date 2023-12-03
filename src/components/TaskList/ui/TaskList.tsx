'use client';

import { Drawer } from '@/common/ui';
import React, { useState } from 'react';
import TasksIcon from '@/common/icons/tasks.svg';
import Plus from '@/common/icons/plus.svg';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
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
          <input
            placeholder="Добавить задачу"
            className={styles.addInput}
            maxLength={150}
            autoComplete="off"
          />
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
