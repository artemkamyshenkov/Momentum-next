import React from 'react';
import cn from 'classnames';
import styles from './Drawer.module.scss';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ children, open, onClose }) => (
  <div className={cn(styles.drawer, { [styles.open]: open })}>
    <div className={styles.content}>
      <button onClick={onClose} type="button" className={styles.close}>
        X
      </button>
      {children}
    </div>
  </div>
);
