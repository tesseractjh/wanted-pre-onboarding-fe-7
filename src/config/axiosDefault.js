import axios from 'axios';

axios.defaults.baseURL = 'https://pre-onboarding-selection-task.shop/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
}, () => ({}));
axios.interceptors.response.use((config) => config, (error) => error.response ?? {});