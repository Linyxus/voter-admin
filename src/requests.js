import axios from 'axios';

const BASE_URL = 'http://api.nonolist.com';

export const http = axios.create({baseURL: BASE_URL});