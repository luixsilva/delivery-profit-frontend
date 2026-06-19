import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_URL_TIMEOUT) || 5000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(`[${config.method?.toUpperCase()}] ${config.url}`);

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        console.error("Não autenticado");
        break;

      case 403:
        console.error("Sem permissão");
        break;

      case 404:
        console.error("Recurso não encontrado");
        break;

      case 500:
        console.error("Erro interno");
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
