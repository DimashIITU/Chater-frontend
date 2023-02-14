import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData, setUserImg } from '../../../redux/slices/user';

import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { Avatar } from '../../Avatar';

import styles from './ChooseAvatarStep.module.scss';
import { handleChangeImage } from '../../../utils/changeImage';

export const ChooseAvatarStep: React.FC = () => {
  const router = useRouter();

  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', async (e) => {
        const path = await handleChangeImage(e);
        dispatch(setUserImg(path));
      });
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/celebration.png"
        title={`Okay, ${userData?.fullName}!`}
        description="How’s this photo?"
      />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar width="120px" height="120px" src={userData.avatarUrl} />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={() => router.push('/main')}>
          Next
          <Image className="d-ib ml-10" src="/static/arrow.svg" width={20} height={12} alt={''} />
        </Button>
      </WhiteBlock>
    </div>
  );
};
