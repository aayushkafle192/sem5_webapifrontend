import axios from './axios';

export function loginUser(data) {
  return axios.post('/auth/login', data);
}

export function registerUser(data) {
  return axios.post('/auth/register', data);
}
