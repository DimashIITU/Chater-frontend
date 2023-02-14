import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:7777',
  withCredentials: true,
});

export default instance;
