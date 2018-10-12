import axios from 'axios';
import { isExpired, clearCreds } from './tools';

const BASE_URL = 'http://api.nonolist.com';

export const http = axios.create({baseURL: BASE_URL});

export const authedGet = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    const refresh = localStorage.getItem('refresh');
    if (refresh === null) {
      reject('You are not authed.');
    }
    if (isExpired(refresh)) {
      clearCreds();
      reject('Your login has been expired.');
    }
    // the refresh token is okay
    http.post('/auth/token/refresh/', {refresh: refresh})
      .then(
        resp => {
          let headers = {};
          if (config.headers)
            headers = config.headers;
          headers['Authorization'] = `Bearer ${resp.data.access}`;
          config.headers = headers;
          http.get(url, config)
            .then(
              resp => resolve(resp),
              err => reject(err)
            );
        },
        err => {
          reject(err);
        }
      );
  })
}

export const authedPost = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    const refresh = localStorage.getItem('refresh');
    if (refresh === null) {
      reject('You are not authed.');
    }
    if (isExpired(refresh)) {
      clearCreds();
      reject('Your login has been expired.');
    }
    // the refresh token is okay
    http.post('/auth/token/refresh/', {refresh: refresh})
      .then(
        resp => {
          let headers = {};
          if (config.headers)
            headers = config.headers;
          headers['Authorization'] = `Bearer ${resp.data.access}`;
          config.headers = headers;
          http.post(url, params, config)
            .then(
              resp => resolve(resp),
              err => reject(err)
            );
        },
        err => {
          reject(err);
        }
      );
  });
};