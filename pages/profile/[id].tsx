import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { Api } from '../../utils/api';

import { Profile } from '../../components/Profile';
import { MyProfile } from '../../components/MyProfile';

interface ProfilePageProps {
  user: {
    avatarUrl: string;
    fullName: string;
    userName: string;
    access_token: string;
    id: number;
    isSubscribe: boolean;
    isMy: boolean;
  };
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return (
    <>
      <div className="container mt-30">
        {user.isMy ? (
          <MyProfile />
        ) : (
          <Profile
            avatarUrl={user.avatarUrl}
            fullName={user.fullName}
            userName={user.userName}
            access_token={user.access_token}
            id={user.id}
            isSubscribe={user.isSubscribe}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data =
      ctx.query.id === 'me'
        ? await Api(ctx).user.getMe()
        : await Api(ctx).user.getOne(+ctx.query.id);
    const myData = await Api(ctx).user.getMe();
    const subscriptionsArr = JSON.parse(myData.subscriptions);
    let res = false;
    let own = false;
    if (subscriptionsArr) {
      const check = subscriptionsArr.find((user) => user.userName === data.userName);
      if (!(typeof check === 'undefined')) {
        res = true;
      }
    }

    if (data.userName === myData.userName) {
      own = true;
    }
    return {
      props: {
        user: { ...data, isSubscribe: res, isMy: own },
      },
    };
  } catch (error) {
    console.warn(error);

    return {
      props: {
        user: { isSubscribe: false, user: null, isMy: false },
      },
    };
  }
};

export default ProfilePage;
