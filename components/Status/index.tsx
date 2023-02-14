import React from 'react';

import clsx from 'clsx';

import styles from './Status.module.scss';

interface StatusProps {
  isOnline: boolean;
  width: string;
  height: string;
}

export const Status: React.FC<StatusProps> = ({ isOnline, width, height }) => {
  return (
    <div
      className={clsx(styles.root, isOnline ? styles.online : styles.offline)}
      style={{ minWidth: width, minHeight: height }}></div>
  );
};
