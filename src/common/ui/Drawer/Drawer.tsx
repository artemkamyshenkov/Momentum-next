import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Drawer.module.scss';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
}
const cx = cn.bind(styles);

export const Drawer: React.FC<DrawerProps> = ({ children, open }) => {
  // const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div className={cn(styles.drawer, { [styles.open]: open })}>{children}</div>
  );
};
