'use client';

import { Drawer } from '@/common/ui';
import React, { useState } from 'react';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(prev => !prev);
  };
  return (
    <>
      <Drawer open={drawerOpen}>
        <div>todo</div>
      </Drawer>
      <button
        type="button"
        className={styles.drawerBtn}
        onClick={handleDrawerOpen}
      >
        Drawer
      </button>
    </>
  );
};
