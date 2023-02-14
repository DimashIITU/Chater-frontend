import { userResponse, userType } from './../types';
import { AxiosInstance } from 'axios';
export const ChatApi = (instance: AxiosInstance) => ({
  getMessages() {},
  async create(follower: userType, initiator: userType) {
    console.log('work');
    const { data } = await instance.post('chats/create', { follower, initiator });
    return data;
  },
});
