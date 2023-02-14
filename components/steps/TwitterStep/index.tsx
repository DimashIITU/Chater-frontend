import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import clsx from 'clsx';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { onNextStep } from '../../../redux/slices/step';

import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';

import styles from './TwitterStep.module.scss';

export const TwitterStep: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      if (!data.source) {
        const userInfo = JSON.parse(data);
        setCookie(null, 'token', userInfo.access_token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
        delete userInfo.access_token;
        dispatch(setUserData());
      }
    });
  }, []);

  const onClickAuth = () => {
    const win = window.open(
      'http://127.0.0.1:7777/auth/github',
      'Auth',
      'width=500,height=500,status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=yes,location=no',
    );

    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        router.push('/main');
      }
    }, 300);
  };

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/connect.png" title="Do you want import info from other resource?" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <Button onClick={onClickAuth}>
          <Image
            src="/static/twitter.svg"
            alt="Twitter logo"
            width={20}
            height={16}
            className={styles.twitterLogo}
          />
          Import from Twitter
          <Image className="d-ib ml-10" src="/static/arrow.svg" width={20} height={12} alt={''} />
        </Button>
        <div onClick={() => dispatch(onNextStep())} className="link mt-20 cup d-ib">
          Enter my info manually
        </div>
      </WhiteBlock>
    </div>
  );
};
