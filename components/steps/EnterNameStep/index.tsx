import React from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import { setCookie } from 'nookies';
import { Api } from '../../../utils/api';

import { onNextStep } from '../../../redux/slices/step';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';

import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';

import styles from './EnterNameStep.module.scss';

export const EnterNameStep = () => {
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = React.useState<string>('');
  const [nickValue, setNickValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const nextDisabled = !nameValue || !nickValue || !passwordValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setNameValue(event.target.value);
    } else if (event.target.name === 'nick') {
      setNickValue(event.target.value);
    } else if (event.target.name === 'password') {
      setPasswordValue(event.target.value);
    }
  };

  const onClickNextStep = async () => {
    try {
      const data = await Api().user.register({
        fullName: nameValue,
        userName: nickValue,
        password: passwordValue,
      });
      setCookie(null, 'token', data.access_token);
      dispatch(setUserData(data));
      dispatch(onNextStep());
    } catch (error) {
      console.warn(error);
      if (error.response.data.statusCode === 403) {
        dispatch(onNextStep(2));
      }
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/man.png" title="What’s your full name?" />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className="mb-30">
          <input
            onChange={handleChangeInput}
            value={nameValue}
            name="name"
            className="field"
            placeholder="Enter fullname"
          />
        </div>
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
          <Image
            className="d-ib ml-10"
            src="/static/arrow.svg"
            width={20}
            height={12}
            alt={'arrow'}
          />
        </Button>
      </WhiteBlock>
    </div>
  );
};
