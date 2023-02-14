import React from 'react';

import clsx from 'clsx';

import { Avatar } from '../Avatar';
import { Status } from '../Status';

import whiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss';
import styles from './ContactsCard.module.scss';

interface ContactsCardProps {
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  onClick: () => void;
}

export const ContactsCard: React.FC<ContactsCardProps> = ({
  name,
  avatarUrl,
  isOnline,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={clsx(whiteBlockStyles.block, styles.card, 'mb-30', 'd-flex')}>
      <Avatar src={avatarUrl} width="110px" height="110px" />
      <div className={styles.userInfo}>
        <div className={styles.title}>{name}</div>
        <Status isOnline={isOnline} width="20px" height="20px" />
      </div>
    </div>
  );
};
