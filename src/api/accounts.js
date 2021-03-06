import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = createInstance();

function signup(signupRequest) {
  return instance.post('/api/accounts/signup', signupRequest);
}

function login(loginRequest) {
  return instance.post('/api/accounts/login', loginRequest);
}

function profile() {
  return instance.get('/api/accounts/profile');
}

function modify(updateRequest) {
  return instance.patch('/api/accounts/modify', updateRequest);
}

function remove() {
  return instance.delete('/api/accounts/remove');
}

export { signup, login, profile, modify, remove };

// 1번째
