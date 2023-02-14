import React from 'react';

import clsx from 'clsx';

import styles from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  userName?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isVoice,
  userName,
}) => {
  return (
    <div
      style={
        src
          ? { minWidth: width, minHeight: height, backgroundImage: `url(${src})` }
          : { minWidth: width, minHeight: height, backgroundColor: 'gray' }
      }
      className={clsx(styles.avatar, isVoice ? styles.avatarBorder : '', className, 'd-ib')}>
      {src ? '' : userName?.[0]}
    </div>
  );
};
