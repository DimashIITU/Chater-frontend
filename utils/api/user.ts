import { login, register, update, userResponse } from '../types';
import { AxiosInstance } from 'axios';

export const UserApi = (instance: AxiosInstance) => ({
  async getMe(): Promise<userResponse> {
    const { data } = await instance.get('user/me');
    return data;
  },
  async uploadImage(img: { img: string }): Promise<any> {
    const { data } = await instance.patch('user/upload', img);
    return data;
  },

  async register(obj: register): Promise<userResponse> {
    const { data } = await instance.post('auth/register', obj);
    return data;
  },
  async login(obj: login): Promise<userResponse> {
    const { data } = await instance.post('auth/login', obj);
    return data;
  },
  async getAll(userName: string): Promise<userResponse[]> {
    const { data } = await instance.get<any, { data: userResponse[] }>('user', {
      params: { userName },
    });
    return data;
  },
  async getOne(id: number): Promise<userResponse> {
    const { data } = await instance.get(`user/${id}`);
    return data;
  },
  async follow(obj: userResponse): Promise<{ affected: number }> {
    const { data } = await instance.patch('user/follow', obj);
    return data;
  },
  async update(obj: update): Promise<userResponse> {
    const { data } = await instance.patch('user/update', obj);
    return data;
  },
});
