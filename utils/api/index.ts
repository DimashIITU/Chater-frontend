import { GetServerSidePropsContext, NextPageContext } from 'next';

import axios from 'axios';
import Cookies, { parseCookies } from 'nookies';

import { ChatApi } from './chat';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  chat: ReturnType<typeof ChatApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const { token } = ctx ? Cookies.get(ctx) : parseCookies();

  const instance = axios.create({
    baseURL: 'http://localhost:7777',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const apis = {
    user: UserApi,
    chat: ChatApi,
  };
  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
};
