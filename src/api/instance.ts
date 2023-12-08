import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'e6ae6895-5543-42ee-855f-a472a7c08a69',
  },
});
