import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type BackButtonProps = {
  title: string;
};
export const BackButton: React.FC<BackButtonProps> = ({ title }) => {
  const router = useRouter();
  return (
    <div onClick={router.back}>
      <div className="d-flex mb-30 cup align-items-center">
        <Image src="/static/back-arrow.svg" width={20} height={12} alt="Back" className="mr-10" />
        <h3>{title}</h3>
      </div>
    </div>
  );
};
