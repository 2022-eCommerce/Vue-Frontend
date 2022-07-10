import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function registerUser(userData) {
  return instance.post('/accounts/signup', userData);
}

function loginUser(userData) {
  return instance.post('/accounts/login', userData);
}
export { registerUser, loginUser };