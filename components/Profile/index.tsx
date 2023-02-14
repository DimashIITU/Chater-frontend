import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { Avatar } from '../Avatar';
import { BackButton } from '../BackButton';
import { Button } from '../Button';

import styles from './Profile.module.scss';
import { Api } from '../../utils/api';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

interface ProfileProps {
  id: number;
  fullName: string;
  userName: string;
  avatarUrl: string;
  access_token: string;
  isSubscribe: boolean;
}

export const Profile: React.FC<ProfileProps> = ({
  fullName,
  userName,
  avatarUrl,
  id,
  access_token,
  isSubscribe,
}) => {
  const userData = useAppSelector(selectUserData);
  const [subscripbe, setSubscribe] = React.useState(isSubscribe);
  const onFollow = async () => {
    try {
      const data = await Api().user.follow({
        fullName,
        userName,
        avatarUrl,
        id,
        access_token,
      });
      if (data.affected === 1) {
        setSubscribe(true);
      }
    } catch (error) {
      console.warn(error);
    }

    try {
      const info = await Api().chat.create(
        { fullName, userName, avatarUrl, id, access_token },
        userData,
      );
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <>
      <Link href="/main">
        <BackButton title="Back" />
      </Link>

      <div className="d-flex  align-items-center">
        <div className="d-flex align-items-center">
          <Avatar src={avatarUrl} width="100px" height="100px" />
          <div className="d-flex flex-column ml-30 mr-30">
            <h2 className="mt-0 mb-0">{fullName}</h2>
            <h3 className={clsx(styles.username, 'mt-0 mb-0')}>@{userName}</h3>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Button
            disabled={subscripbe}
            className={styles.followButton}
            onClick={onFollow}
            color="blue">
            {subscripbe ? 'Followed' : 'Follow'}
          </Button>
          <Button disabled={!subscripbe} className={styles.followButton} color="green">
            Message
          </Button>
        </div>
      </div>
    </>
  );
};
