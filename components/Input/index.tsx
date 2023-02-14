import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Api } from '../../utils/api';
import { userResponse } from '../../utils/types';

import styles from './Input.module.scss';

interface InputProps {}

export const Input: React.FC<InputProps> = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [usersList, setUsersList] = React.useState<userResponse[]>([]);
  const sendRequest = async () => {
    try {
      if (!inputValue) {
        setUsersList([]);
      } else {
        const users = await Api().user.getAll(inputValue);
        setUsersList(users);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  React.useEffect(() => {
    sendRequest();
  }, [inputValue]);
  return (
    <div className={styles.container}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
        type="text"
      />
      <Image
        src={'/static/search.png'}
        alt={'search'}
        className={styles.icon}
        width={20}
        height={20}
      />
      {!!usersList.length && (
        <div className={styles.hintsContainer}>
          {usersList.map((user) => (
            <Link
              href={`profile/${user.id}`}
              onClick={() => setInputValue('')}
              className={styles.hint}>
              {user.userName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
