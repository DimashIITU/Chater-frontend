import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './WhiteBlock.module.scss';

interface WhiteBlockProps {
  children: ReactNode;
  className: string;
}

export const WhiteBlock: React.FC<WhiteBlockProps> = ({ children, className }) => {
  return <div className={clsx(styles.block, className)}>{children}</div>;
};
