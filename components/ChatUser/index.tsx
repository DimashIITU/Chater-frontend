import React from 'react';
import Link from 'next/link';

import { userType } from '../../utils/types';

import { Avatar } from '../Avatar';

import styles from './ChatUser.module.scss';

type ChatUserProps = {} & userType;

export const ChatUser: React.FC<ChatUserProps> = ({ id, avatarUrl, userName }) => {
  return (
    <Link href={`/profile/${id}`} className="d-i-flex flex-column align-items-center mr-40 mb-40">
      <Avatar src={avatarUrl} height="100px" width="100px" />
      <div className="mt-10">
        <b>{userName}</b>
      </div>
    </Link>
  );
};
