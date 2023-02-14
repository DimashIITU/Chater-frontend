import React from 'react';

import { Api } from './api';
export const upload = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    try {
      Api().user.uploadImage({ img: reader.result as string });
    } catch (error) {
      console.warn(error);
    }
  };
};
export const handleChangeImage = (event: Event): string => {
  const file = (event.target as HTMLInputElement).files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    upload(file);
    return imageUrl;
  }
};
