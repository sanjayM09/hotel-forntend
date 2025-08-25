import axios from "axios";

const baseURLs = {
  // development: 'http://localhost:8060/', // API server url (Development)
  production: 'https://hotel-4rlh.onrender.com/', // API server url (Production)
  //staging: 'https://dev.hibiller.com/',  // API server url (Staging)
};

// const environment = process.env.NODE_ENV || 'development';
console.log(environment,'environment');
const environment = 'production';

export const baseRequest = axios.create({
  baseURL: baseURLs[environment],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});


export const IMG_BASE_URL = baseURLs[environment];

//   import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import dayjs from 'dayjs';
// import { SetCredentialsFunction } from './SetCredentialsFunction';
// import { store } from '../store';

// const baseURLs = {
//   development: 'http://localhost:8000/', // API server url (Development)
//   production: 'https://dev.api.hibiller.com/', // API server url (Production)
//   staging: 'https://dev.hibiller.com/',  // API server url (Staging)
// };

// // const environment = process.env.NODE_ENV || 'development';
// const environment = 'production';   



// const request = axios.create({
//   baseURL: baseURLs[environment],
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//   },
// });


// request.interceptors.request.use(async (config) => {

//   let authToken = localStorage.getItem('persist') ? JSON.parse(localStorage.getItem('persist')) : null;

//   config.headers.Authorization = authToken?.jwt;

//   const jwt = jwtDecode(authToken?.jwt)
//   const isExpired = dayjs.unix(jwt.exp).diff(dayjs()) < 1;

//   if (!isExpired) return config


//   try {
//     const response = await axios.post(`${baseURLs[environment]}token/generate_token`, {
//       refresh: authToken?.jwt
//     });

//     SetCredentialsFunction(response.data);
//     localStorage.setItem('persist', JSON.stringify(response.data));

//     config.headers.Authorization = response.data.jwt;
//   } catch (error) {
//     // Handle error during token refresh
//     console.error('Error during token refresh:', error);
//     throw error; // This will cause the original request to fail
//   }

//   return config;
// })

// request.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isAxiosError(error) && !error.response) {
//       console.error('Network Error: rrrrrrrreee', error.message);
//       // Handle the network error
//     }
//     return Promise.reject(error);
//   }
// );

// export default request;

// export const baseRequest = axios.create({
//   baseURL: baseURLs[environment],
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//   },
// });

// export const IMG_BASE_URL = baseURLs[environment];




