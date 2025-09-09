import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;