import axios from "axios";

const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT =
  process.env.REACT_APP_SERVER_PORT === undefined
    ? 5000
    : process.env.REACT_APP_SERVER_PORT;
const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api/`,
  timeout: 1000,
});

export const viaCepApi = axios.create({
  baseURL: `https://viacep.com.br/ws/`,
  timeout: 1000,
});

export default api;
