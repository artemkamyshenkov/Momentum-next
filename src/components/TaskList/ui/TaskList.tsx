'use client';

import { Drawer } from '@/common/ui';
import React, { useState } from 'react';
import TasksIcon from '@/common/icons/tasks.svg';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
  };

  return (
    <>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <div>todo</div>
      </Drawer>
      <button
        type="button"
        className={styles.drawerBtn}
        onClick={handleDrawerToggle}
      >
        <span>
          <TasksIcon />
        </span>
      </button>
    </>
  );
};
