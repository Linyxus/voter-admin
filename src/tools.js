import jwt_decode from 'jwt-decode';

export const saveCreds = (username, refresh) => {
  localStorage.setItem('username', username);
  localStorage.setItem('refresh', refresh);
}

export const clearCreds = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('refresh');
}

export const isExpired = (token) => ((jwt_decode(token)).exp - (Date.now() / 1000)) < 5