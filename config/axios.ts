import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.103:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

export default instance;
