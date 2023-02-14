import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import clsx from 'clsx';
import { handleChangeImage } from '../../utils/changeImage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserData, setUserData, setUserImg } from '../../redux/slices/user';

import { Avatar } from '../Avatar';
import { BackButton } from '../BackButton';

import styles from './MyProfile.module.scss';
import { Button } from '../Button';
import { WhiteBlock } from '../WhiteBlock';
import { setCookie } from 'nookies';
import { onNextStep } from '../../redux/slices/step';
import { Api } from '../../utils/api';

interface MyProfileProps {}

export const MyProfile: NextPage<MyProfileProps> = () => {
  const { avatarUrl, fullName, userName } = useAppSelector(selectUserData);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', async (e) => {
        const path = await handleChangeImage(e);
        dispatch(setUserImg(path));
      });
    }
  }, []);
  const [nameValue, setNameValue] = React.useState<string>(fullName);
  const [nickValue, setNickValue] = React.useState<string>(userName);
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
      const data = await Api().user.update({
        fullName: nameValue,
        userName: nickValue,
        password: passwordValue,
      });
      setCookie(null, 'token', data.access_token);
    } catch (error) {
      console.warn(error);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <Link href="/main">
        <BackButton title="Back" />
      </Link>

      <div className="">
        <div className="d-flex-c align-items-center ">
          <div className={styles.avatar}>
            <Avatar width="120px" height="120px" src={avatarUrl} userName={userName} />
          </div>
          <div className="mb-30 mt-10">
            <label htmlFor="image" className="link cup">
              Choose a different photo
            </label>
          </div>
          <input id="image" ref={inputFileRef} type="file" hidden />
        </div>
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
    </>
  );
};
