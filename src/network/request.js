import axios from 'axios';

const request = (config) => {

  const baseApi = 'https://easy-mock.com/mock/5de0e2b21f398811637cfd92/api';

  const instance = axios.create({
    baseURL: baseApi,
    timeout: 5000
  });

  return instance(config);
}

const request2 = (config) => {

  const baseApi = 'http://localhost:3000/';

  const instance = axios.create({
    baseURL: baseApi,
    timeout: 5000
  });

  return instance(config);
}

export { request, request2 }
