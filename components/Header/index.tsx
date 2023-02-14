import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

import { Avatar } from '../Avatar';
import { Input } from '../Input';

import styles from './Header.module.scss';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { userName, avatarUrl } = useAppSelector(selectUserData);

  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/main">
          <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
            <Image src="/static/hand-wave.png" alt="Logo" width={30} height={30} className="mr-5" />
          </div>
        </Link>
        <Input />
        <Link href="/profile/me">
          <div className="d-flex align-items-center cup">
            <b className="mr-5">{userName}</b>
            <Avatar src={avatarUrl} width="50px" height="50px" userName={userName} />
          </div>
        </Link>
      </div>
    </div>
  );
};
