import React from 'react';
import Close from '@/common/icons/close.svg';
import classNames from 'classnames/bind';
import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);
interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  width?: number;
  title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  open,
  onClose,
  width = 400,
  title = '',
}) => (
  <div className={cx('drawer', { open })} style={{ maxWidth: width }}>
    <div className={cx('content')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>{title}</h3>
        <button onClick={onClose} type="button" className={styles.close}>
          <Close />
        </button>
        <div className={cx('divider')} />
      </div>

      {children}
    </div>
  </div>
);
