import React from 'react';
import Image from 'next/image';

import { useAppDispatch } from '../../../redux/hooks';
import { onNextStep } from '../../../redux/slices/step';

import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';

import styles from './WelcomeStep.module.scss';

export const WelcomeStep: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <Image
          className={styles.handWaveImg}
          src="/static/hand-wave.png"
          width={40}
          height={40}
          alt="Celebration"
        />
        Welcome to Chater!
      </h3>
      <div>
        <Button onClick={() => dispatch(onNextStep())}>
          Get your username
          <Image
            className="d-ib ml-10"
            src="/static/arrow.svg"
            width={20}
            height={12}
            alt={'arrow'}
          />
        </Button>
      </div>
      <div onClick={() => dispatch(onNextStep(4))} className="link mt-15 cup d-ib">
        Sign in
      </div>
    </WhiteBlock>
  );
};
