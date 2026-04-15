import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:7777',
  withCredentials: true,           // Always send cookies/JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;