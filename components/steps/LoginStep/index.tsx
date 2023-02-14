import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';

import styles from './LoginStep.module.scss';

export const LoginStep = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [nickValue, setNickValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const nextDisabled = !nickValue || !passwordValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'nick') {
      setNickValue(event.target.value);
    } else if (event.target.name === 'password') {
      setPasswordValue(event.target.value);
    }
  };
  const onClickNextStep = async () => {
    try {
      const data = await Api().user.login({
        userName: nickValue,
        password: passwordValue,
      });
      setCookie(null, 'token', data.access_token);
      delete data.access_token;
      dispatch(setUserData(data));
      router.push('main');
    } catch (error) {
      console.warn(error);
      if (error.response.data.statusCode === 404) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/man.png" title="What’s your full name?" />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className="mb-30">
          <input
            onChange={handleChangeInput}
            value={nickValue}
            name="nick"
            className="field"
            placeholder="Enter nickname"
          />
        </div>
        <div className="mb-30">
          <input
            onChange={handleChangeInput}
            name="password"
            value={passwordValue}
            className="field"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-30">{errorMessage}</div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
          Next
          <Image className="d-ib ml-10" src="/static/arrow.svg" width={20} height={12} alt={''} />
        </Button>
      </WhiteBlock>
    </div>
  );
};
