/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://68.183.101.214:3000',
});

export default api;
