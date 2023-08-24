import axios from 'axios';

const MOV_URL = import.meta.env.VITE_MOV_URL;
const API_KEY = import.meta.env.VITE_MOV_KEY;

const instance = axios.create({
  baseURL: MOV_URL,
  timeout: 1000,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY
  }
});


export default instance;

