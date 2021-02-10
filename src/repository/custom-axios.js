import axios from 'axios';
import store from '../store';

const token = store.getState().auth.token;
const headers =  {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

if (token) {
    headers['Authorization'] = `Bearer ${token}`;
}

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers
});

export default instance;
