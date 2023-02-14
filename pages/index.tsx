import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';

import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { TwitterStep } from '../components/steps/TwitterStep';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { LoginStep } from '../components/steps/LoginStep';

import { useAppSelector } from '../redux/hooks';
import { selectStep } from '../redux/slices/step';

import { Api } from '../utils/api';

interface HomeProps {
  isAuthorized?: boolean;
}

const stepsComponents = {
  0: WelcomeStep,
  1: TwitterStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: LoginStep,
};

export const Home: NextPage<HomeProps> = () => {
  const step = useAppSelector(selectStep);
  const Step = stepsComponents[step];

  return (
    <>
      <Head>
        <title>Chater</title>
      </Head>
      <Step />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await Api(ctx).user.getMe();
    return {
      props: {
        prop: null,
      },
      redirect: {
        destination: '/main',
        permanent: false,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {
        prop: null,
      },
    };
  }
};

export default Home;
